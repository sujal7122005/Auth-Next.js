<div align="center">

# 🔐 Next.js Authentication System

A full-stack, production-ready authentication system built with **Next.js 16**, **MongoDB**, and **JWT** — featuring secure signup, email verification, login, profile management, and logout.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Features

| Feature                 | Description                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| **User Signup**         | Register with username, email, and password. Passwords are hashed using `bcryptjs`.             |
| **Email Verification**  | A verification email is sent on signup using `Nodemailer`. Users must verify before logging in. |
| **User Login**          | Authenticate with email & password. JWT token is issued and stored in an `httpOnly` cookie.     |
| **Profile View**        | Fetch and display the authenticated user's profile data (protected route).                      |
| **Logout**              | Clears the JWT cookie and redirects to the login page.                                          |
| **Route Protection**    | Middleware proxy guards protected routes — unauthenticated users are redirected to login.       |
| **Toast Notifications** | Real-time feedback on every action using `react-hot-toast`.                                     |
| **Form Validation**     | Submit buttons stay disabled until all required fields are filled.                              |

---

## 🛠️ Tech Stack

| Layer                | Technology                                |
| -------------------- | ----------------------------------------- |
| **Framework**        | Next.js 16 (App Router)                   |
| **Language**         | TypeScript                                |
| **Database**         | MongoDB with Mongoose ODM                 |
| **Authentication**   | JWT (`jsonwebtoken`) + `httpOnly` cookies |
| **Password Hashing** | bcryptjs                                  |
| **Email Service**    | Nodemailer (SMTP)                         |
| **Styling**          | Tailwind CSS 4                            |
| **HTTP Client**      | Axios                                     |
| **Notifications**    | react-hot-toast                           |

---

## 📁 Project Structure

```
src/
├── proxy.ts                            # ⛨ Middleware — route protection & redirects
├── app/
│   ├── page.tsx                        # Landing page with animated UI
│   ├── layout.tsx                      # Root layout
│   ├── globals.css                     # Global styles (Tailwind)
│   ├── signup/page.tsx                 # Signup form
│   ├── login/page.tsx                  # Login form
│   ├── profile/page.tsx                # User profile (protected)
│   ├── verifyemail/page.tsx            # Email verification handler
│   └── api/users/
│       ├── signup/route.ts             # POST  — Register new user
│       ├── login/route.ts              # POST  — Authenticate & issue JWT
│       ├── logout/route.ts             # GET   — Clear token cookie
│       ├── profile/route.ts            # POST  — Get user profile (auth required)
│       └── userverification/route.ts   # POST  — Verify email token
├── components/                         # Reusable UI components
├── DBConfig/
│   └── DbConfig.ts                     # MongoDB connection helper
├── helpers/
│   ├── getDataFromToken.ts             # Extract userId from JWT cookie
│   └── mailer.ts                       # Send verification/reset emails
└── models/
    └── userModel.js                    # Mongoose User schema
```

---

## 🔄 Auth Flow

```
┌──────────┐     POST /api/users/signup     ┌───────────┐
│  Signup   │ ──────────────────────────────▶│  MongoDB   │
│  Page     │                                │  (save)    │
└──────────┘                                └───────────┘
      │                                           │
      │                                    Send verification
      │                                    email (Nodemailer)
      ▼                                           │
┌──────────────┐   click link / token      ┌──────▼──────┐
│ Verify Email │ ◀─────────────────────────│   Mailbox    │
│    Page      │                           └─────────────┘
└──────────────┘
      │  POST /api/users/userverification
      ▼
┌──────────┐     POST /api/users/login      ┌───────────┐
│  Login    │ ──────────────────────────────▶│  Validate  │
│  Page     │                                │  + JWT     │
└──────────┘                                └───────────┘
      │  httpOnly cookie set                      │
      ▼                                           │
┌──────────┐     POST /api/users/profile    ┌─────▼─────┐
│ Profile   │ ──────────────────────────────▶│  Decode   │
│  Page     │ ◀──────────────────────────────│  Token    │
└──────────┘      user data returned        └───────────┘
      │
      │  GET /api/users/logout (clear cookie)
      ▼
┌──────────┐
│  Login   │
│  Page    │
└──────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **SMTP credentials** for sending emails (e.g., [Mailtrap](https://mailtrap.io/) for dev)

### 1. Clone the repository

```bash
git clone https://github.com/sujal7122005/Auth-Next.js.git
cd Auth-Next.js
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key

DOMAIN=http://localhost:3000

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_AUTH_USER=your_mailtrap_user
MAIL_AUTH_PASS=your_mailtrap_pass
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint                      | Description                      | Auth |
| ------ | ----------------------------- | -------------------------------- | ---- |
| `POST` | `/api/users/signup`           | Register a new user              | No   |
| `POST` | `/api/users/login`            | Login & receive JWT cookie       | No   |
| `GET`  | `/api/users/logout`           | Logout & clear cookie            | Yes  |
| `POST` | `/api/users/profile`          | Get authenticated user's profile | Yes  |
| `POST` | `/api/users/userverification` | Verify email with token          | No   |

---

## 🗄️ User Schema

```js
{
  username: String; // required, unique
  email: String; // required, unique
  password: String; // required, hashed with bcryptjs
  isVerified: Boolean; // default: false
  isAdmin: Boolean; // default: false
  verificationToken: String; // hashed token for email verification
  verificationTokenExpiry: Date; // 1-hour expiration
  forgotPasswordToken: String; // for password reset (future)
  forgotPasswordTokenExpiry: Date; // 1-hour expiration
  createdAt: Date; // auto (timestamps)
  updatedAt: Date; // auto (timestamps)
}
```

---

## �️ Middleware — Route Protection

The `src/proxy.ts` file acts as a **middleware layer** that runs before every matched route, protecting the application at the edge:

```ts
// Matched routes: /  /profile  /login  /signup  /verifyemail
```

| Scenario                                            | Behavior                    |
| --------------------------------------------------- | --------------------------- |
| **Unauthenticated** user visits `/profile`          | ⛔ Redirected to `/login`   |
| **Authenticated** user visits `/login` or `/signup` | ↩️ Redirected to `/profile` |
| **Authenticated** user visits `/profile`            | ✅ Access granted           |
| **Anyone** visits `/` (landing page)                | ✅ Always accessible        |

**How it works:**

1. The middleware reads the `token` cookie from the incoming request
2. It classifies the path as **public** (`/`, `/login`, `/signup`, `/verifyemail`) or **protected** (`/profile`)
3. If a logged-in user tries to access a public auth page → redirect to `/profile`
4. If a guest tries to access a protected page → redirect to `/login`

This ensures unauthorized users can **never** access the profile route directly.

---

## 🔒 Security Highlights

- **Middleware route protection** — proxy intercepts requests before they reach the page
- **Password hashing** with `bcryptjs` (salt rounds: 10)
- **JWT tokens** stored in `httpOnly` cookies (not accessible via JavaScript)
- **Token expiry** — JWT expires in 24 hours, verification tokens in 1 hour
- **Email verification** required before login is allowed
- **Server-side token validation** on protected routes

---

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 👤 Author

**Sujal Patel**

- GitHub: [@sujal7122005](https://github.com/sujal7122005)

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

</div>
