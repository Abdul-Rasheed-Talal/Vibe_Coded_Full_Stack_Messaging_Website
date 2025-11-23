# Instagram-like Chat App

A full-stack real-time messaging application built with **Next.js 15**, **Tailwind CSS v4**, and **Supabase**. This project replicates core Instagram Direct Message features including real-time chat, user search, and a responsive UI.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Supabase Realtime.
- **Authentication**: Secure Sign Up and Login with email/password.
- **User Search**: Find and start conversations with other users.
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile.
- **Dark Mode**: Automatic theme switching based on system preference.
- **Modern UI**: Built with Tailwind CSS v4 and Framer Motion for smooth animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- A [Supabase](https://supabase.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/Abdul-Rasheed-Talal/Vibe_Coded_Full_Stack_Messaging_Website.git
cd Vibe_Coded_Full_Stack_Messaging_Website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

1.  Create a new project on [Supabase](https://supabase.com).
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Copy the contents of `supabase/schema.sql` from this repository and run it to set up the database tables and security policies.
4.  Get your **Project URL** and **anon public key** from Project Settings > API.

### 4. Set Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### Sign Up / Login
- Navigate to the home page.
- Use the toggle to switch between **Login** and **Sign Up**.
- Create an account to get started.

### Starting a Chat
1.  Click the **Search** icon in the sidebar.
2.  Search for a user by their username.
3.  Click on a user to open the chat window.
4.  Start typing and sending messages!

### Profile
- Click the **Profile** icon to view your current user details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
