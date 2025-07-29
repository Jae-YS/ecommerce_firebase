# Lunava — Fullstack Firebase React E-Commerce App

Welcome to **Lunava**, a fully featured, responsive e-commerce web application built with **React**, **Firebase**, **Redux Toolkit**, and **React Query**. It simulates a modern end-to-end shopping experience with real-time Firestore integration.

![Lunava Preview](./screenshot/lunava.png)

---

## Features

- **Authentication** via Firebase Auth (Email/Password)
- **Cart Management** using Redux Toolkit
- **Firestore Integration** for products, users, and orders
- **Order History** with full details view
- **Per-user cart persistence** using `sessionStorage`
- **Quantity adjustments**, subtotal, total calculations
- **Routing** with React Router
- **Material UI** for clean, responsive UI
- Real-time data fetching with React Query

---

## Tech Stack

| Tool / Library     | Purpose                    |
| ------------------ | -------------------------- |
| **React 18**       | Frontend UI                |
| **Redux Toolkit**  | Cart state management      |
| **React Query**    | Firestore querying/caching |
| **React Router**   | Page navigation            |
| **Firebase Auth**  | User authentication        |
| **Firestore DB**   | CRUD operations on data    |
| **React Toastify** | Notifications              |
| **Material UI**    | Design system              |

---

## Getting Started

### Prerequisites

- Node.js v16+
- Firebase Project with:
  - Email/Password Authentication enabled
  - Firestore Database enabled

---

### Installation

```bash
git clone https://github.com/Jae-YS/ecommerce_firebase
cd lunava-ecommerce
npm install
```

---

### Set Up Firebase

1. Create a Firebase project in [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Cloud Firestore**
4. In project settings, copy your config:

```env
# .env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

### Run the App

```bash
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## Usage Flow

1. **Register/Login** using Firebase Authentication
2. **Browse Products** from Firestore
3. **Create / Update / Delete** products if you're the owner
4. **Add to Cart** and adjust quantities
5. **Buy Now** to place order and save to Firestore
6. **View Orders** in Profile with full details

---

## Project Structure

```bash
src/
├── components/         # Reusable UI components
├── context/            # Auth & UI context providers
├── features/           # Redux slices (e.g., cart)
├── hooks/              # React Query & Firebase hooks
├── pages/              # Route-based views (Home, Profile, Orders)
├── firebaseConfig.ts   # Firebase setup
├── types/              # TypeScript types (User, Product, Order)
```

---

## Authentication Flow

- Firebase Email/Password based login
- After registration, a Firestore `users/{uid}` document is created
- Auth context tracks login state and user info
- Protected routes are blocked from unauthenticated users

---

## Product & Order Management

- Products stored in `products` collection with owner info
- Orders saved to `orders` with embedded product list and user info
- All Firestore access is via custom React Query hooks

---

## Notes

- All cart data is stored in `sessionStorage` per user (`cart:<email>`)
- Firebase is used for **Authentication**, **Firestore**, and **CRUD**
- Clean error handling and loading states built in
- Built for learning — not production-secure yet

---
