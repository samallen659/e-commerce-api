#! /bin/bash
npx prisma db push
npx ts-node prisma/seed.ts
npm run dev
