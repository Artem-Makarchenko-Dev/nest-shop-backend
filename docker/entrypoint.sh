#!/bin/sh
set -e

echo "🚀 Starting entrypoint..."

# Wait for PostgreSQL (optional)
if [ -n "$DATABASE_URL" ]; then
  echo "⏳ Waiting for PostgreSQL..."
  until nc -z "$(echo $DATABASE_URL | sed -E 's/.*@([^:/]+).*/\1/')" 5432; do
    sleep 1
  done
  echo "✅ PostgreSQL is ready!"
else
  echo "⚠️ DATABASE_URL not set, skipping DB wait."
fi

echo "📦 Running Prisma migrations..."
npx prisma migrate deploy || true

# Start the NestJS server
PORT=${PORT:-8080}
echo "✅ Starting NestJS on port $PORT..."
exec node dist/src/main.js