from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from app.models import Item, Seller, User
from app.serializer import ItemSerializer

class SellerItemManageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Assuming the seller is linked to the user model
        user = User.objects.get(name=request.user)
        seller = Seller.objects.get(user_id_id=user.id)
        items = Item.objects.filter(seller_id=seller)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)