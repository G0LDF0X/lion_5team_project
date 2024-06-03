import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from app.models import Payment, User, Order
import requests, datetime
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def save_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(bool(request.user.is_authenticated))
        print(bool(request.user))
        user = User.objects.get(id=data['userInfo']['id'])
        print(data)
        order = Order.objects.create(
            user_id=user,
            payment_method=data['payMethod'],
            shipping_price=5000,  
            total_price=data['totalAmount'],
            paid_at=datetime.datetime.now(),
            is_delivered=False,
        )
        order.save()
        
        payment = Payment.objects.create(
            user_id=user,
            payment_method=data['payMethod'],
            payment_amount=data['totalAmount'],
            paymentId=data['paymentId'],
        )
        payment.save()
        return JsonResponse({'message': 'Payment saved successfully!', 'paymentId': payment.paymentId})
    
    return JsonResponse({'message': 'Payment not saved!'})



import traceback

PORTONE_API_SECRET = 'X7dEg87XCLOuG1oa8dhGRzuw13a8Ppoaj3d5m0KrWKEtHVd5ftMtLjmIHqKOQGRqq4SdMcvW9HQbCKTl'

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def complete_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        paymentId = data['paymentId']

        try:
            # 1. 포트원 결제내역 단건조회 API 호출
            paymentResponse = requests.get(
                f'https://api.portone.io/payments/{paymentId}',
                headers={'Authorization': f'PortOne {PORTONE_API_SECRET}'}
            )
            paymentResponse.raise_for_status()
            payment = paymentResponse.json()

            # 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
            order = Payment.objects.get(id=paymentId)
            if order.payment_amount == payment['amount']['total']:
                if payment['status'] == 'VIRTUAL_ACCOUNT_ISSUED':
                    # 가상 계좌가 발급된 상태입니다.
                    # 계좌 정보를 이용해 원하는 로직을 구성하세요.
                    pass
                elif payment['status'] == 'PAID':
                    # 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
                    order.paid_at = timezone.now()
                    order.save()
                else:
                    # 결제 상태가 예상치 못한 값입니다.
                    return JsonResponse({'message': 'Unexpected payment status!'}, status=400)
            else:
                # 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
                return JsonResponse({'message': 'Payment amount mismatch!'}, status=400)

            return JsonResponse({'message': 'Payment completed successfully.'})

        except Exception as e:
            # 결제 검증에 실패했습니다.
            return JsonResponse({'message': traceback.format_exc()}, status=400)
