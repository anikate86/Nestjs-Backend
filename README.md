# NestJS Backend Setup & Deployment Guide

This docs contains

1. Running the NestJS project locally
2. Running test cases
3. Deploying the project using Docker
4. Swagger Documentation

## Also I will be attaching the psotman collection from which you can verify

---

## 🟢 Part 1: How to Run the Code Locally

### 1. Clone the Repository

git clone <your-repo-url>
cd <repo-folder-name>

### 2. Install Dependencies

npm install

### 3. Set Up Environment Variables

Create a `.env` file in the root

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=youruser
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdbname
JWT_SECRET=your_jwt_secret

```

### 4. Start PostgreSQL (If Not Using Docker)
Install and run PostgreSQL locally or use Docker as described below.

###5 Build the project
npm run build

### 6. Run the Application

npm run start:dev

Your API will now be accessible at: http://localhost:3000

---

## 🧪 Part 2: How to Run the Test Cases

you will fine jest.config.ts file in test folder
### 1. Run Unit Tests

npm run test

### 2. Run Unit Tests in Watch Mode

npm run test:watch


### 3. Run Test Coverage Report

npm run test:cov

### 4. Run E2E (End-to-End) Tests

npm run test:e2e


💡 **Note**: E2E tests need a running PostgreSQL instance and proper `.env.test` or mock environment configured.

---

## 🐳 Part 3: How to Deploy Using Docker

### 1. Docker Compose File
Ensure the following `docker-compose.yml` is in your root directory:


version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
      - DATABASE_USER=myuser
      - DATABASE_PASSWORD=mypassword
      - DATABASE_NAME=mydatabase

  postgres:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: nestjs_db
    ports:
      - "5432:5432"
```

### 2. Create a Dockerfile

Ensure a `Dockerfile` exists with NestJS build instructions.

### 3. Build and Run Containers

docker-compose up --build

The app will be accessible at: http://localhost:3000

To rebuild after changes:

docker-compose up --build

To stop:

docker-compose down

✅ You’re all set to develop, test, and deploy your NestJS backend!

###4 Før Swagger Documentation
Just run the project

Call this API
http://localhost:3000/api
