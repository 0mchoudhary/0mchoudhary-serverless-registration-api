# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a Node Express API service, backed by a DynamoDB table, running on AWS Lambda using the Serverless Framework.

This template configures multiple functions, including:

POST /register - Create a new user

GET /users/{userId} - Retrieve a specific user

GET /users - Retrieve all users

PUT /users/{userId} - Update user details

DELETE /users/{userId} - Remove a user from the database

The Express.js framework is responsible for routing and handling requests internally. This implementation uses the serverless-http package to transform event requests into payloads compatible with Express.js. To learn more, refer to the serverless-http README.

Additionally, this template provisions a DynamoDB database for storing user information.

## 🚀 Features

* Fully Serverless API with AWS Lambda

* CRUD Operations (Create, Read, Update, Delete)

* DynamoDB for persistent user storage

* Serverless Framework for easy deployment

* Environment Variables support via .env and serverless-dotenv-plugin

### 🛠️ Setup & Deployment

1️⃣ Install Dependencies
```
npm install
```
2️⃣ Configure Environment Variables
```
touch .env
```
Add AWS deployment details:
```
DEPLOYMENT_BUCKET=serverless-framework-deployment-XXXXXX
USERS_TABLE=UsersTable
```
3️⃣ Deploy to AWS
```
serverless deploy
```
After deployment, you'll see API endpoints like:
```
endpoints:
  POST - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/register
  GET  - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  GET  - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users
  PUT  - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
  DELETE - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
functions:
  registerUser: registration-form-dev-registerUser (45 MB)
```
⚠️ Note: Your API is public by default. For production, configure an authorizer (docs).

### 📌 API Usage

➤ Register a User
```
curl -X POST https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/register \
     -H "Content-Type: application/json" \
     -d '{"userId": "someUserId", "name": "Om Choudhary", "email": "om@gmail.com", "age": 21, "college": "SOA University", "batch": "2026"}'
```
➤ Retrieve a User by ID
```
curl -X GET https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/someUserId
```
➤ Retrieve All Users
```
curl -X GET https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users
```
➤ Update a User
```
curl -X PUT https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/someUserId \
     -H "Content-Type: application/json" \
     -d '{"userId": "someUserId", "name": "Om Choudhary", "email": "om@gmail.com", "age": 21, "college": "SOA University", "batch": "2026"}'
```
➤ Delete a User
```
curl -X DELETE https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users/someUserId
```
### 🛠️ Local Development

➤ View Logs
```
serverless logs -f registerUser --tail
```
➤ Run Locally
```
serverless dev
```
This will start a local emulator of AWS Lambda, allowing you to test functions before deploying.

When done, deploy the latest changes using:
```
serverless deploy
```
