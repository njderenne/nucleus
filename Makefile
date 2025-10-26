.PHONY: help setup dev start stop restart logs clean backup restore build test

help: ## Show this help message
	@echo "Nucleus - Your Life's Operating System"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

setup: ## Initial setup (creates .env, builds, and starts services)
	@bash scripts/setup.sh

dev: ## Start development environment (databases only)
	@bash scripts/dev.sh

start: ## Start all services
	@echo "🚀 Starting Nucleus..."
	@docker compose up -d
	@echo "✅ Nucleus is running at http://localhost"

stop: ## Stop all services
	@echo "🛑 Stopping Nucleus..."
	@docker compose down
	@echo "✅ Nucleus stopped"

restart: ## Restart all services
	@echo "♻️  Restarting Nucleus..."
	@docker compose restart
	@echo "✅ Nucleus restarted"

logs: ## Show logs (follow mode)
	@docker compose logs -f

logs-backend: ## Show backend logs
	@docker compose logs -f backend

logs-frontend: ## Show frontend logs
	@docker compose logs -f frontend

status: ## Show service status
	@docker compose ps

build: ## Build all services
	@echo "🔨 Building Nucleus..."
	@docker compose build
	@echo "✅ Build complete"

rebuild: ## Rebuild and restart all services
	@echo "🔨 Rebuilding Nucleus..."
	@docker compose down
	@docker compose up -d --build
	@echo "✅ Nucleus rebuilt and running"

clean: ## Remove all containers, volumes, and images
	@echo "🧹 Cleaning up Nucleus..."
	@docker compose down -v --rmi all
	@echo "✅ Cleanup complete"

backup: ## Create database backup
	@bash scripts/backup.sh

restore: ## Restore database from backup
	@bash scripts/restore.sh

shell-backend: ## Open shell in backend container
	@docker compose exec backend /bin/bash

shell-frontend: ## Open shell in frontend container
	@docker compose exec frontend /bin/sh

shell-db: ## Open PostgreSQL shell
	@docker compose exec postgres psql -U nucleus_user nucleus

test-backend: ## Run backend tests
	@echo "🧪 Running backend tests..."
	@cd backend && pytest

test-frontend: ## Run frontend tests
	@echo "🧪 Running frontend tests..."
	@cd frontend && npm test

install-frontend: ## Install frontend dependencies
	@cd frontend && npm install

install-backend: ## Install backend dependencies
	@cd backend && pip install -r requirements.txt

format-backend: ## Format backend code
	@cd backend && black app/ && isort app/

format-frontend: ## Format frontend code
	@cd frontend && npm run format

health: ## Check service health
	@echo "🏥 Checking Nucleus health..."
	@curl -f http://localhost/health || echo "❌ Health check failed"

