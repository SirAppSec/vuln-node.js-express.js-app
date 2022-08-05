curl -X 'POST' \
  'http://localhost:5000/v1/user/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "amit",
  "email": "amit@gmail.com",
  "password": "123",
  "role": "user",
  "address": "aadssd",
  "profile_pic": "20aab704e5532523652ac9d908d3b8de"
}'
curl -X 'POST' \
  'http://localhost:5000/v1/user/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "shir",
  "email": "shir@gmail.com",
  "password": "123",
  "role": "user",
  "address": "aadssd",
  "profile_pic": "20aab704e5532523652ac9d908d3b8de"
}'

curl -X 'PUT' \
  'http://localhost:5000/v1/admin/promote/1' \
  -H 'accept: application/json'

curl -X 'GET' \
  'http://localhost:5000/v1/admin/users/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU5NDI3MjQwLCJleHAiOjE2NTk1MTM2NDB9.QpYD330lcw_AxJR16FKGWugQk0HNHRhOqonaH75GUDE'


  curl -X 'POST' 
  'http://localhost:5000/v1/admin/upload-pic/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@src/assets/bud.jpg;type=image/jpeg' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['filename'])"

  curl -X 'POST' \
  'http://localhost:5000/v1/admin/upload-pic/' \
  --silent -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@src/assets/bud.jpg;type=image/jpeg' 
#  |  python3 -c 'import sys, json; print(json.load(sys.stdin)['filename'])' \

  curl -X 'POST' \
  'http://localhost:5000/v1/admin/new-beer/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  --proxy "http://localhost:8080" \
  -d '{ 
  "name": "Beer!!!", 
  "price": 12,
  "picture": "20aab704e5532523652ac9d908d3b8de"
}'