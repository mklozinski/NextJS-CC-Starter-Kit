# Next.js Starter Kit

A modern, production-ready Next.js starter kit with authentication, database integration, password reset functionality, and all the essential tools you need to build your next web application.

## Features

- **Next.js 15** - App Router, Server Components, and optimized performance
- **Authentication** - Complete auth system with NextAuth.js
- **Password Reset** - Secure password reset functionality with email notifications
- **Email Templates** - Beautiful email templates using React Email and Tailwind CSS
- **Database** - MongoDB with Prisma ORM for type-safe database operations
- **Payments** - Stripe Checkout sessions with secure webhook handling
- **Styling** - Tailwind CSS for rapid UI development
- **Dark/Light Theme** - Theme switching with `next-themes`
- **TypeScript** - Full type safety throughout the application
- **Developer Experience** - ESLint, hot reload, and modern tooling

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Email**: [Resend](https://resend.com/) with [React Email](https://react.email/)
- **Payments**: [Stripe](https://stripe.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **UI Components**: Custom components with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)
- Git
- Resend account for email functionality
- Stripe account for payments (optional if not using Stripe)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-starter-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Core
   DATABASE_URL="<your-mongodb-url>"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_URL="http://localhost:3000"
   NEXTAUTH_SECRET="<generate-strong-secret>"

   # OAuth (optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""

   # Analytics (optional)
   NEXT_PUBLIC_GOOGLE_ANALYTICS=""

   # Emails (Resend)
   RESEND_API_KEY=""
   FROM_EMAIL="noreply@yourdomain.com"
   EMAIL_NAME="Your App"

   # Stripe
   STRIPE_SECRET_KEY=""
   STRIPE_WEBHOOK_SECRET=""
   STRIPE_PRICE_PRO_MONTHLY=""
   STRIPE_PRICE_PRO_YEARLY=""
   STRIPE_PRICE_ULTRA_MONTHLY=""
   STRIPE_PRICE_ULTRA_YEARLY=""
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push the schema to your database
   npx prisma db push
   
   # Optional: Seed the database
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Authentication Features

### Available Authentication Methods
- **Email/Password** - Traditional credential-based authentication
- **Google OAuth** - Sign in with Google (configure in .env)
- **GitHub OAuth** - Sign in with GitHub (configure in .env)

### Password Reset Flow
1. User clicks "Forgot Password?" on the login page
2. User enters their email address
3. System generates a secure reset token (valid for 1 hour)
4. Beautiful email with reset link is sent via Resend
5. User clicks the link and enters a new password
6. Password is securely hashed and updated in the database

### Pages
 - `/` - Home (instructions)
- `/pricing` - Pricing page with Stripe checkout example
- `/dashboard` - Protected example page
- `/login` - Sign in page with all authentication methods
- `/register` - User registration
- `/forgot-password` - Request password reset
- `/reset-password` - Reset password with token

## 📧 Email Templates

The starter kit includes beautiful, responsive email templates built with React Email and Tailwind CSS:

- **Forgot Password Email** - Clean, professional password reset email
- **Password Reset Success** - Confirmation email after successful reset

Templates are located in `src/components/emails/` and use:
- React Email components for structure
- Tailwind CSS for styling
- Reusable header and footer components

## 🗄️ Database Schema

The application uses the following main models:

### User
- Basic user information (name, email)
- Password (hashed with bcryptjs)
- Account status and role
- Password reset tokens and expiry

### Account & Session
- NextAuth.js models for OAuth and session management

### VerificationToken
- Email verification and password reset tokens

## 🚀 Deployment

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform:

```env
DATABASE_URL="your-production-mongodb-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"
# OAuth credentials if using
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
# Stripe (optional)
STRIPE_SECRET_KEY="sk_live_your_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_live_secret"

```

### Database Migration
```bash
# In production, use migrate instead of db push
npx prisma migrate deploy
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database

### Project Structure
```
src/
├── app/                  # Next.js 13+ app directory
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── stripe/       # Stripe checkout + webhook
│   │   └── user/         # User profile/password endpoints
│   ├── pricing/          # Pricing page (Stripe example)
│   ├── (auth)/dashboard/ # Protected example page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── forgot-password/  # Password reset request
│   └── reset-password/   # Password reset form
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── emails/           # Email templates
│   ├── providers/        # Context providers (theme, auth)
│   └── ui/               # UI components
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Built using Next.js, TypeScript, NextAuth, Prisma, and Stripe with dark/light theme support.
