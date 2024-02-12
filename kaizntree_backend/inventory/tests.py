# Unit test cases
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.test import APIClient
from .models import Item, Category

class RegistrationTestCase(TestCase):
    def test_registration_success(self):
        response = self.client.post('/api/register/', {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_registration_duplicate_user(self):
        User.objects.create_user(username='existinguser', password='testpassword')
        response = self.client.post('/api/register/', {'username': 'existinguser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'User with this username already exists')

class LoginTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login_success(self):
        response = self.client.post('/api/login/', {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_login_invalid_credentials(self):
        response = self.client.post('/api/login/', {'username': 'testuser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Invalid username or password')

class ItemListTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        category =  Category.objects.create(name='Test Category')
        Item.objects.create(name='Test Item', sku='testing_sku', stock_status='testing_stock', available_stock=200, category=category)

    def test_item_list_authenticated(self):
        response = self.client.get('/api/items/dashboard')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_item_list_unauthenticated(self):
        self.client.credentials() 
        response = self.client.get('/api/items/dashboard')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class LogoutTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_logout(self):
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
