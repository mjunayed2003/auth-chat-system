🚀 Realtime Chat Backend (NestJS + Prisma + PostgreSQL + Passport JWT)

এই প্রজেক্টটি একটি Simple Realtime Chat System Backend, যেখানে user authentication, messaging, এবং protected routes রয়েছে। Technologies:

NestJS

Prisma ORM

PostgreSQL

Passport.js (JWT Strategy)

Docker 

Typescript




📦 Features
✅ User Features

User Registration

User Login (JWT Token)

Protected Profile Route

Secure Password Hashing (bcrypt)


✅ Chat Features

Create & Save Messages

Message belongs to a Chat

Fetch All Messages per Chat


✅ Security

JWT Authentication (Passport.js)

Protected Routes using @UseGuards(AuthGuard("jwt"))

DTO Validation using class-validator


🛠 Tech Stack
Technology	Usage
NestJS	Backend Framework
Prisma ORM	Database Access
PostgreSQL	Database
Passport.js	Authentication
JWT	Token-based Auth
Docker	Local DB Container



🧱 Database Schema
User Model
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  messagesSent     Message[] @relation("sentMessages")
  messagesReceived Message[] @relation("receivedMessages")
}

Message Model
model Message {
  id         String   @id @default(cuid())
  chatId     String
  senderId   String
  receiverId String
  content    String
  createdAt  DateTime @default(now())
  sender   User @relation("sentMessages", fields: [senderId], references: [id])
  receiver User @relation("receivedMessages", fields: [receiverId], references: [id])
}

📁 Project Structure
src/
 ├── auth/
 │    ├── auth.controller.ts
 │    ├── auth.service.ts
 │    ├── auth.module.ts
 │    ├── jwt.strategy.ts
 │    └── dto/
 
 ├── user/
 │    ├── user.controller.ts
 │    ├── user.service.ts
 │    └── user.module.ts
 ├── chat/
 
 │    ├── message.controller.ts
 │    ├── message.service.ts
 │    └── chat.module.ts
 ├── prisma/
 
 │    ├── prisma.service.ts
 │    └── prisma.module.ts
 └── app.module.ts


🔐 Authentication Flow
1️⃣ User Registers

POST /auth/register


2️⃣ User Logs In

POST /auth/login
Response → { access_token }

3️⃣ Access Protected Routes

Header Example:

Authorization: Bearer <JWT_TOKEN>


4️⃣ Profile Route (Protected)

GET /profile (requires JWT)

🔒 Protected Profile Route Example
@UseGuards(AuthGuard("jwt"))
@Get()
getProfile(@Req() req) {
  return req.user;
}


📨 Message APIs
🟢 Create Message

POST /message

Body:

{
  "chatId": "123",
  "senderId": "abc",
  "receiverId": "xyz",
  "content": "Hello!"
}



🐳 Run PostgreSQL using Docker
version: '3.9'
services:
  postgres:
    image: bitnami/postgresql:latest
    container_name: my-postgres
    environment:
      POSTGRESQL_USERNAME: myuser
      POSTGRESQL_PASSWORD: mypassword
      POSTGRESQL_DATABASE: mydb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/bitnami/postgresql

volumes:
  pgdata:



🔌 Environment Variables

.env ফাইলে:

DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb"
JWT_SECRET="your_secret_here"


🚀 Commands
Install dependencies
npm install

Generate Prisma Client
npx prisma generate

Migrate Database
npx prisma migrate dev

Start project
npm run start:dev


🎯 Endpoints Summary
Method	Route	Protected	Description
POST	/auth/register	❌	Register user
POST	/auth/login	❌	Login & get JWT
GET	/profile	✅	Get logged-in user
POST	/message	✅	Create message
