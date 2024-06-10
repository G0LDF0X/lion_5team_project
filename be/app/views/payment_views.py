import json
from django.http import JsonResponse
from app.models import Payment, User, Order, OrderItem, Item
import requests, datetime
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from app.serializer import PaymentSerializer
from rest_framework.response import Response
import time
from dotenv import load_dotenv
import os
# @permission_classes([IsAuthenticated])

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def save_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id=data['userInfo']['id'])
        
        order = Order.objects.create(
            user_id=user,
            payment_method=data['payMethod'],
            shipping_price=5000,  
            total_price=data['totalAmount'],
            paid_at=datetime.datetime.now(),
            is_delivered=False,
            address = data['address']
        )
        order.save()
        
        payment = Payment.objects.create(
            user_id=user,
            payment_method=data['payMethod'],
            payment_amount=data['totalAmount'],
            paymentId=data['paymentId'],
        )
        payment.save()


        # OrderItem에도 저장
        for item in data['items']:
            item_instance = Item.objects.get(id=item['item_id'])
            OrderItem.objects.create(
                item_id=item_instance,
                order_id=order,
                name=item['name'],
                qty=item['qty'],
                price_multi_qty=item['price'],
                image=item['image'],
                payment_id=payment, 
            )

        response = complete_payment(request)
        
        if response.status_code == 200:
            return JsonResponse({'message': 'Payment saved and completed successfully!', 'paymentId': payment.paymentId})
        else:
            return JsonResponse({'message': 'Payment saved but not completed!', 'paymentId': payment.paymentId, 'error': response.content.decode()})
    
    return JsonResponse({'message': 'Payment not saved!'})





def complete_payment(request):
    PORTONE_API_SECRET = 'X7dEg87XCLOuG1oa8dhGRzuw13a8Ppoaj3d5m0KrWKEtHVd5ftMtLjmIHqKOQGRqq4SdMcvW9HQbCKTl'
    if request.method == 'POST':
        data = json.loads(request.body)
        paymentId = data.get('paymentId')

        if not paymentId:
            return JsonResponse({'message': 'Payment ID is missing.'}, status=400)
        
        try:
            # 1. 포트원 결제내역 단건조회 API 호출
            paymentResponse = requests.get(
                f'https://api.portone.io/payments/{paymentId}',
                headers={'Authorization': f'PortOne {PORTONE_API_SECRET}'}
            )
            paymentResponse.raise_for_status()
            payment = paymentResponse.json()

            # 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
            order = Payment.objects.get(paymentId=paymentId)
            if order.payment_amount == payment['amount']['total']:
                if payment['status'] == 'VIRTUAL_ACCOUNT_ISSUED':
                    print('Virtual account issued. Please pay within 24 hours.')
                    pass
                elif payment['status'] == 'PAID':
                    # 모든 금액이 지불된 경우.
                    order.paid_at = timezone.now()
                    order.save()
                    print('결제 정상처리.')
                else:
                    # 결제 상태가 예상치 못한 값입니다.
                    return JsonResponse({'message': 'Unexpected payment status!'}, status=400)
            else:
                # 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
                return JsonResponse({'message': 'Payment amount mismatch!'}, status=400)

            return JsonResponse({'message': 'Payment completed successfully.'})

        except Exception as e:
            # 결제 검증에 실패했습니다.
            return JsonResponse({'message': str(e)}, status=400)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def payment_detail(request, pk):
    try:
        payment = Payment.objects.get(id=pk)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
    except Payment.DoesNotExist:
        return Response({"error": "Payment does not exist"}, status=404)
    





load_dotenv()

class PortOneTokenManager:
    def __init__(self):
        self.token = None
        self.expiry_time = None

    def get_token(self):
        if self.token is None or time.time() > self.expiry_time:
            self.refresh_token()
        return self.token

    def refresh_token(self):
        api_secret = os.getenv('API_SECRET')
        headers = {'Content-Type': 'application/json'}
        payload = json.dumps({'apiSecret': api_secret})
        response = requests.post('https://api.portone.io/login/api-secret', data=payload, headers=headers)
        response.raise_for_status()  # Raise exception if the request failed
        data = response.json()
        self.token = data['accessToken']
        self.expiry_time = time.time() + 24 * 60 * 60  # The token is valid for 1 day

    def update_token(self, refresh_token):
        headers = {'Content-Type': 'application/json'}
        payload = json.dumps({'refreshToken': refresh_token})
        response = requests.post('https://api.portone.io/token/refresh', data=payload, headers=headers)
        response.raise_for_status()  # Raise exception if the request failed
        data = response.json()
        self.token = data['accessToken']
        self.expiry_time = time.time() + 24 * 60 * 60  # The token is valid for 1 day

token_manager = PortOneTokenManager()




@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def payment_refund(request, pk):
    headers = {'Authorization': f'Bearer {token_manager.get_token()}' }
    
    storeId = os.getenv('STORE_ID')
    
    payment = Payment.objects.get(id=pk)
    
    url = f'https://api.portone.io/payments/{payment.paymentId}/cancel'

    body = {
        "storeId": storeId,
        "reason": "Reason",
    }

    response = requests.post(url, headers=headers, json=body)

    if response.status_code == 200:
        # Update the is_refund field of the related OrderItem
        OrderItem.objects.filter(payment_id=payment.id).update(is_refund=True)
        return JsonResponse({"message": "Refund successful."}, status=200)
    
    else:
        return JsonResponse({"message": "Refund failed."}, status=400)