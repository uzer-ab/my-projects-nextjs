# 🚀 CodeFolio

**CodeFolio** is a modern, high-performance portfolio builder designed specifically for software developers. It allows professionals to showcase their projects, skills, and experience in a sleek, "hacker-chic" interface that emphasizes code and technical proficiency.

![CodeFolio Banner](/src/app/icon.svg)

## ✨ Features

-   **Dynamic Project Showcase**: detailed project cards with dynamic tech stack tags, links, and expandable descriptions.
-   **Professional Dashboard**: A secure admin area to manage your profile, resume, and project portfolio.
-   **Sleek Aesthetics**: Built with a "Professional Blue" dark mode theme, featuring subtle gradients, glassmorphism, and smooth animations.
-   **Visitor & Admin Views**: Public-facing portfolio with a subtle "Made with CodeFolio" badge for visitors, and hidden admin controls for owners.
-   **Performance First**: deeply optimized with Next.js App Router, Server Components, and Suspense streaming.

## 🛠️ Tech Stack

Built with the latest modern web technologies for speed, scalability, and developer experience:

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom CSS variable design system.
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (serverless via [Neon](https://neon.tech/)).
-   **ORM**: [Prisma](https://www.prisma.io/) for type-safe database access.
-   **Authentication**: [NextAuth.js](https://authjs.dev/) (v5) for secure credential-based login.
-   **UI Components**: Custom components with [Lucide React](https://lucide.dev/) icons.

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   PostgreSQL Database URL (e.g., from Neon)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/codefolio.git
    cd codefolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
    AUTH_SECRET="your_generated_secret"
    AUTH_TRUST_HOST=true
    AUTH_URL=http://localhost:3000 # Production URL in deployment
    ```

4.  **Initialize Database**
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view your new portfolio!

## 🔐 Credentials

-   **Demo Login**: Create a new account via the `/auth/signup` page.
-   **Admin Access**: Navigate to `/dashboard` after logging in.

---