#!/bin/bash

# Nucleus Restore Script
# Restores PostgreSQL database from a backup

set -e

BACKUP_DIR="./backups"

echo "🧠 Nucleus Restore Script"
echo "========================="
echo ""

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ No backups directory found."
    exit 1
fi

# List available backups
echo "📋 Available backups:"
ls -lh "$BACKUP_DIR"/nucleus_backup_*.sql 2>/dev/null || {
    echo "❌ No backup files found in $BACKUP_DIR"
    exit 1
}

echo ""
echo "Enter the backup file name (or full path):"
read BACKUP_FILE

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
    # Try in backup directory
    BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo "❌ Backup file not found: $BACKUP_FILE"
        exit 1
    fi
fi

echo ""
echo "⚠️  WARNING: This will replace the current database!"
echo "   Backup file: $BACKUP_FILE"
echo ""
echo "Are you sure you want to continue? (yes/no)"
read CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Restore cancelled."
    exit 0
fi

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

echo ""
echo "🔄 Restoring database..."

# Drop and recreate database
docker compose exec -T postgres psql -U "$POSTGRES_USER" -c "DROP DATABASE IF EXISTS $POSTGRES_DB;"
docker compose exec -T postgres psql -U "$POSTGRES_USER" -c "CREATE DATABASE $POSTGRES_DB;"

# Restore from backup
cat "$BACKUP_FILE" | docker compose exec -T postgres psql -U "$POSTGRES_USER" "$POSTGRES_DB"

echo "✅ Database restored successfully!"
echo ""
echo "♻️  Restart the application to apply changes:"
echo "   docker compose restart backend"

