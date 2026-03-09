# EL FAYROUZ LAB Website

Next.js application built with Tailwind CSS, supporting fully RTL layout and pixel-perfect replication of Stitch designs.

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

## Setup Environment Variables

Currently, MongoDB is configured but requires an environment variable. If you want to use the database components, ensure `.env.local` contains:

```
MONGODB_URI=your_mongodb_connection_string
```

## Structure

- `/src/app`: Next.js App Router pages (Home, Tests, Articles, Admin, etc.)
- `/src/components/ui`: Shared React components matching the design.
- `/src/models`: Mongoose schemas for MongoDB.
- `/src/lib/db`: Database connection utility.
