from django.urls import path
from .views import ItemListCreate, Logout, Login, Register


urlpatterns = [
    path('register/', Register.as_view(), name='register'), 
    path('login/', Login.as_view(), name='login'), 
    path('logout/', Logout.as_view(), name='logout'),
    path('items/dashboard', ItemListCreate.as_view(), name='item-list-create'),
]
