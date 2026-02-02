#!/bin/bash

API_URL="http://localhost:3000/api"

echo "=== 1. Register User ==="
REGISTER_RES=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123", "name":"Test User"}')
echo "$REGISTER_RES"

echo -e "\n=== 2. Login ==="
LOGIN_RES=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}')
echo "$LOGIN_RES"

TOKEN=$(echo $LOGIN_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo -e "\n=== 3. Create Product ==="
CREATE_RES=$(curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Awesome Laptop", "description":"A very fast laptop", "price":999.99, "category":"Electronics", "stock":10}')
echo "$CREATE_RES"

PRODUCT_ID=$(echo $CREATE_RES | grep -o '"id":"[^"]*' | cut -d'"' -f4)

echo -e "\n=== 4. Get All Products (Filtered) ==="
curl -s -X GET "$API_URL/products?category=Electronics&search=Laptop"
echo ""

echo -e "\n=== 5. Update Product ==="
curl -s -X PUT "$API_URL/products/$PRODUCT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"price":899.99, "stock":5}'
echo ""

echo -e "\n=== 6. Delete Product ==="
curl -s -X DELETE "$API_URL/products/$PRODUCT_ID" \
  -H "Authorization: Bearer $TOKEN"
echo "Status code for delete: $?"

echo -e "\n=== 7. Verify Deletion ==="
curl -s -X GET "$API_URL/products/$PRODUCT_ID"
echo ""
