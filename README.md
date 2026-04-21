This is a Next.js project for Apex Rivals.

## Environment Setup

1. Copy the example environment file:

	Windows (PowerShell):
	Copy-Item .env.example .env

	macOS/Linux:
	cp .env.example .env

2. Open .env and set real values for all variables.

Required variables:

- DATABASE_URL: PostgreSQL connection string
- BETTER_AUTH_SECRET: secret for Better Auth (long random string)
- BETTER_AUTH_URL: app URL (for local development use http://localhost:3000)
- GOOGLE_CLIENT_ID: Google OAuth client ID
- GOOGLE_CLIENT_SECRET: Google OAuth client secret
- GMAIL_USER: Gmail account used to send auth emails
- GMAIL_APP_PASSWORD: Gmail App Password for SMTP
- NEXT_PUBLIC_BASE_URL: public app URL used in email templates
- JOLPICA_URL: Formula 1 API base URL used by seed script

3. Run dependencies and start development:

	pnpm install
	pnpm dev

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
