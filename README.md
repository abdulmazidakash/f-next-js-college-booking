
# 🎓 Next.js College Booking

A full-stack web application built with **Next.js**, **MongoDB**, **Tailwind CSS**, and **NextAuth.js** that allows users to browse colleges, book admissions, manage their profiles, and leave reviews. Designed for an intuitive and responsive user experience with full authentication and CRUD functionalities.

🌐 **Live Site:** [https://next-js-college-booking.vercel.app/](https://next-js-college-booking.vercel.app/)

---

## 🖼️ Project UI Preview

![Project UI Screenshot](https://your-screenshot-link.com/preview.png)

> Replace the above link with an actual screenshot from your deployed app or UI demo.

---

## 📑 Table of Contents

- [🔍 Project Overview](#-project-overview)
- [🚀 Features](#-features)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Installation](#️-installation)
- [🛠️ Usage](#️-usage)
- [🔐 Authentication](#-authentication)
- [🎨 UI & Design](#-ui--design)
- [📦 Dependencies](#-dependencies)
- [⚙️ Configuration](#️-configuration)
- [🧪 Examples](#-examples)
- [🐞 Troubleshooting](#-troubleshooting)
- [👥 Contributors](#-contributors)
- [📄 License](#-license)

---

## 🔍 Project Overview

The **Next.js College Booking** system is a web application for users to search, view, and book college admission services. It includes dynamic routes, user authentication (email, Google, and social login), and CRUD operations on user profiles and reviews.

**Goal:** Build a modern, mobile-friendly, responsive college booking portal with real-world usability, inspired by [Livi UI](https://livi.wpengine.com/).

---

## 🚀 Features

- 🔍 College search functionality with dynamic display
- 📚 College listing with image, admission dates, events, and sports info
- 📄 College details with full breakdown of offerings
- 📥 Admission form with fields: name, subject, contact, DoB, etc.
- 🧾 My College page for tracking applications and leaving reviews
- 🔒 Auth with Google, email/password, social login
- 🔁 Password reset and secure login/logout
- 👤 Profile edit (name, email, university, address)
- 🌟 Ratings and reviews system
- 📷 College image gallery & student research papers section
- ❌ Custom 404 page
- 📱 Fully responsive design

---

## 📁 Folder Structure

```

├── public/
│   ├── uploads/              # (For local uploads)
├── src/
│   ├── app/
│   │   ├── actions/          # Server Actions (e.g., login/register)
│   │   ├── api/              # API Routes (auth, admissions, reviews)
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # DB & auth utilities
│   │   ├── (routes)/         # App pages: home, admission, colleges, etc.
│   │   ├── globals.css       # Global styles
│   │   └── layout.js         # Main layout wrapper
├── .env.local                # Local environment variables
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── package.json              # Project metadata and dependencies
└── README.md                 # You're reading it!

````

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/next-js-college-booking.git
cd next-js-college-booking

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your MongoDB URI, JWT_SECRET, EMAIL_SERVER, etc.

# Run the development server
npm run dev
````

---

## 🛠️ Usage

1. Visit `/register` to create a new user account, or use the test account:

   * 👤 **Email:** `student@gmail.com`
   * 🔐 **Password:** `Pa$$w0rd`

2. Use `/login` to sign in.

3. Navigate through:

   * `/colleges`: browse college listings
   * `/admission`: submit application form
   * `/my-college`: view booked colleges and add reviews
   * `/profile`: view and edit your profile

4. Use the search bar on the home page to find colleges.

---

## 🔐 Authentication

Implemented via **NextAuth.js** with:

* 📧 Email/Password login
* 🔗 Google OAuth login
* 🔁 Password reset flow
* 🔒 Protected routes (e.g., `/my-college`, `/profile`)

Only authenticated users can:

* View full college details
* Submit admission forms
* Post reviews
* Edit personal profiles

---

## 🎨 UI & Design

* Tailwind CSS with **DaisyUI** components
* Inspired by: [Livi - College Booking UI](https://livi.wpengine.com/)
* Fully responsive (mobile, tablet, desktop)
* Swiper carousel for galleries and testimonials
* Clean and intuitive user interface

---

## 📦 Dependencies

### Core

* `next` `15.3.5`
* `react` `19.0.0`
* `mongodb` `6.17.0`
* `next-auth` `4.24.11`
* `nodemailer` `6.10.1`
* `bcrypt` `6.0.0`

### UI & UX

* `tailwindcss` `4.1.11`
* `daisyui` `5.0.46`
* `react-icons`, `swiper`, `react-hot-toast`

### Dev

* `eslint`, `eslint-config-next`, `@eslint/eslintrc`

---

## ⚙️ Configuration

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
EMAIL_SERVER=smtp://username:password@smtp.mailserver.com:587
EMAIL_FROM=your@email.com
```

> For image hosting, use ImgBB or an external image service, as Vercel does not support local image uploads.

---

## 🧪 Examples

* Try searching for a college in the search bar
* Submit an admission form under the “Admission” route
* Post a review from “My College”
* Edit your profile from the dropdown menu
* Check out the research paper section on the homepage

---

## 🐞 Troubleshooting

| Problem                | Solution                                          |
| ---------------------- | ------------------------------------------------- |
| MongoDB not connecting | Check your `MONGODB_URI` in `.env.local`          |
| Auth not working       | Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL`       |
| Email not sending      | Ensure `nodemailer` config in `.env.local` is set |
| Vercel upload issues   | Use ImgBB or Cloudinary for image handling        |

---

## 👥 Contributors

* 🧑‍💻 **Your Name** – Full Stack Developer

> Feel free to open issues or pull requests to contribute!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🖼️ Project UI Preview

![UI Preview](./public/college-booking.png)


---

💡 **Inspired by** the design of [Livi](https://livi.wpengine.com/) for modern education and admissions platforms.

