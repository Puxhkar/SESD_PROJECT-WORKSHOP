# Product Management System Backend

A robust, professional-grade CRUD backend built with Node.js, Express, and TypeScript. This project follows clean OOP principles and implements a multi-layered architecture (Controllers, Services, Repositories).

## 🚀 Features

- **Full CRUD Support**: Complete management for Products and Users.
- **Advanced Querying**:
  - 🔍 **Search**: Full-text search across product name and description.
  - 📂 **Filtering**: Filter by category and price range.
  - 🔢 **Pagination**: Server-side pagination with customizable limits.
  - ↕️ **Sorting**: Dynamic sorting by any field and order.
- **Security**:
  - 🔐 **JWT Authentication**: Protected routes for sensitive operations.
  - 🔑 **Password Hashing**: Secure storage using `bcrypt`.
- **Quality Architecture**:
  - 🏗️ **Clean OOP**: Separation of concerns using Controllers -> Services -> Repositories.
  - ✅ **Validation**: Schema-based request validation using Zod.
  - 🛠️ **Error Handling**: Global error middleware with clean JSON responses.
- **Database**: 📦 Persistent storage using SQLite via Prisma ORM.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma (v6)
- **Database**: SQLite
- **Validation**: Zod
- **Auth**: JWT (jsonwebtoken)

## 📁 Project Structure

```text
src/
├── config/         # Database & environment configuration
├── controllers/    # Request handling & response formatting
├── middlewares/    # Auth, Validation, and Global Error handling
├── repositories/   # Data access layer (Prisma interactions)
├── routes/         # API endpoint definitions
├── services/       # Business logic (Filtering, Pagination)
├── utils/          # Validation schemas (Zod)
└── index.ts        # App entry point
```

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- npm

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# (Optional) Seed or migrate if needed
npx prisma migrate dev --name init
```

### 4. Running the App
```bash
# Development mode with hot-reload
npm run dev

# Production build
npm run start
```

## 📍 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Welcome & Info | No |
| `GET` | `/health` | Server Health Check | No |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and get JWT token | No |
| `GET` | `/api/products` | Get all products (with filters) | No |
| `GET` | `/api/products/:id` | Get single product | No |
| `POST` | `/api/products` | Create a new product | Yes (Bearer Token) |
| `PUT` | `/api/products/:id` | Update a product | Yes (Owner only) |
| `DELETE` | `/api/products/:id`| Delete a product | Yes (Owner only) |

## 🧪 Verification

You can verify all features at once by running the provided test script:
```bash
bash scripts/verify_api.sh
```
