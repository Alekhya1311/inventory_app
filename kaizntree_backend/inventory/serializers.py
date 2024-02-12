from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['sku', 'name', 'category', 'tags', 'stock_status', 'available_stock']
        
class UserSerializer(serializers.Serializer):
  
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)   
