#!/bin/bash

# Nucleus Backup Script
# Creates a backup of the PostgreSQL database

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/nucleus_backup_$TIMESTAMP.sql"

echo "🧠 Nucleus Backup Script"
echo "========================"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if postgres container is running
if ! docker compose ps postgres | grep -q "Up"; then
    echo "❌ PostgreSQL container is not running."
    echo "   Start it with: docker compose up -d postgres"
    exit 1
fi

echo "📦 Creating database backup..."
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_FILE"

if [ -f "$BACKUP_FILE" ]; then
    echo "✅ Backup created successfully!"
    echo "   File: $BACKUP_FILE"
    echo "   Size: $(du -h "$BACKUP_FILE" | cut -f1)"
    echo ""
    
    # Keep only last 7 backups
    echo "🧹 Cleaning old backups (keeping last 7)..."
    ls -t "$BACKUP_DIR"/nucleus_backup_*.sql | tail -n +8 | xargs -r rm
    echo "✅ Cleanup complete"
else
    echo "❌ Backup failed!"
    exit 1
fi

echo ""
echo "📋 Available backups:"
ls -lh "$BACKUP_DIR"/nucleus_backup_*.sql

