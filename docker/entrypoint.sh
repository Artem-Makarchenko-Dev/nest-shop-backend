#!/bin/sh
set -e

echo "🚀 Starting entrypoint..."

# --- Wait for PostgreSQL (важливо у Docker Compose) ---
echo "⏳ Waiting for PostgreSQL to be ready..."
until nc -z "$(echo $DATABASE_URL | sed -E 's/.*@([^:/]+).*/\1/')" 5432; do
  sleep 1
done
echo "✅ PostgreSQL is up!"

# --- Run migrations ---
echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

# --- Run seed (if exists) ---
echo "🌱 Running seed script (if exists)..."
if [ -f "./prisma/seed.js" ]; then
  node ./prisma/seed.js
else
  echo "⚠️  No seed file found, skipping..."
fi

# --- Start application ---
echo "✅ Starting NestJS application..."
node dist/main.js