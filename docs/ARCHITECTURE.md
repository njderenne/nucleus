# Nucleus Architecture

Deep dive into the technical architecture of Nucleus.

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                        │
│                  (PWA Installable)                       │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS
┌───────────────────────┴─────────────────────────────────┐
│                    Nginx (Port 80/443)                   │
│                  Reverse Proxy & SSL                     │
└──────────────┬─────────────────────┬────────────────────┘
               │                     │
       ┌───────┴────────┐   ┌───────┴────────┐
       │   Frontend     │   │    Backend     │
       │   (Next.js)    │   │   (FastAPI)    │
       │   Port 3000    │   │   Port 8000    │
       └────────────────┘   └───────┬────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌───────┴──────┐  ┌────┴─────┐  ┌─────┴─────┐
            │  PostgreSQL  │  │  Qdrant  │  │   Redis   │
            │  (Relational)│  │ (Vector) │  │  (Cache)  │
            └──────────────┘  └──────────┘  └───────────┘
```

## 🎯 Core Principles

### Multi-Tenant Architecture
- Each user has isolated data via `user_id` foreign key
- JWT tokens carry user identity
- Middleware enforces tenant isolation
- No cross-user data leakage

### Separation of Concerns
- **Frontend**: UI/UX, state management, API calls
- **Backend**: Business logic, validation, database operations
- **Database**: Data persistence and relationships
- **Vector DB**: Semantic search and AI memory
- **Nginx**: Request routing, SSL termination, static files

## 📦 Technology Stack

### Frontend (Next.js 14)

**Framework**: Next.js 14 with App Router
- Server-side rendering (SSR)
- Client-side rendering (CSR)
- Static generation where applicable
- API routes for serverless functions

**State Management**:
- Zustand for global state (auth)
- TanStack Query for server state
- React hooks for local state

**Styling**:
- Tailwind CSS for utility-first styling
- Radix UI for accessible components
- Custom design tokens for branding

**Key Libraries**:
- `axios`: HTTP client
- `lucide-react`: Icon library
- `recharts`: Data visualization
- `mapbox-gl`: Maps and location features

### Backend (FastAPI)

**Framework**: FastAPI (Python 3.11+)
- Async/await for high performance
- Automatic OpenAPI documentation
- Pydantic for validation
- Type hints throughout

**Database**:
- SQLAlchemy (async) for ORM
- Alembic for migrations
- PostgreSQL for relational data
- Connection pooling

**AI Integration**:
- LangChain for AI orchestration
- OpenAI API for language models
- Qdrant for vector embeddings
- Semantic search capabilities

**Authentication**:
- JWT tokens (access + refresh)
- Password hashing with bcrypt
- Token-based API security
- HTTPBearer security scheme

### Infrastructure

**Containerization**:
- Docker for consistent environments
- Docker Compose for orchestration
- Multi-stage builds for optimization
- Volume persistence for data

**Database**:
- PostgreSQL 15 (Alpine)
- Persistent volumes
- Health checks
- Automated backups

**Caching** (Optional):
- Redis for session storage
- API response caching
- Background job queues

**Reverse Proxy**:
- Nginx for routing
- SSL/TLS termination
- Gzip compression
- Static file serving

## 🔐 Security Model

### Authentication Flow

```
1. User registers/logs in
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT tokens
   - Access token (30 min)
   - Refresh token (7 days)
   ↓
4. Frontend stores tokens
   - Access token in memory/localStorage
   - Refresh token in httpOnly cookie
   ↓
5. API requests include Bearer token
   ↓
6. Backend validates token
   - Checks signature
   - Verifies expiration
   - Extracts user_id
   ↓
7. Request processed with user context
```

### Data Isolation

All database queries are scoped to the authenticated user:

```python
# Automatic filtering by user_id
items = await db.execute(
    select(PantryItem).where(PantryItem.user_id == current_user_id)
)
```

### Password Security

- Passwords hashed with bcrypt (cost factor 12)
- Never stored in plaintext
- Never transmitted except during registration/login
- No password recovery (reset only)

## 📊 Data Model

### User
- Central entity
- One-to-many with all other entities
- Cascade delete for data cleanup

### Pantry Items
- Track food inventory
- Support expiration tracking
- Categorized by type and location

### Budget
- Transactions (income/expense)
- Budgets (monthly limits)
- Category-based tracking

### Hunting
- Locations (GPS coordinates)
- Sightings (wildlife observations)
- Pattern analysis (AI)

### Photos
- File metadata
- GPS coordinates
- AI tagging and captions

## 🤖 AI Architecture

### Vector Memory

```
User Interaction
      ↓
Text Embedding (OpenAI)
      ↓
Store in Qdrant
      ↓
Future Queries
      ↓
Semantic Search
      ↓
Context Retrieval
      ↓
Enhanced AI Response
```

### AI Features

1. **Chat Assistant**
   - Context-aware conversations
   - Long-term memory via vectors
   - Personalized responses

2. **Summarization**
   - Daily/weekly life summaries
   - Financial insights
   - Pattern detection

3. **Recommendations**
   - Meal suggestions from pantry
   - Budget optimization tips
   - Hunting pattern analysis

## 🔄 Request Flow

### Frontend → Backend → Database

```
1. User Action (e.g., "Add Pantry Item")
   ↓
2. React Component
   - Form submission
   - Validation
   ↓
3. API Client (axios)
   - POST /api/pantry/
   - Include Bearer token
   ↓
4. Nginx
   - Route to backend
   - Pass headers
   ↓
5. FastAPI Endpoint
   - Validate token
   - Extract user_id
   ↓
6. Security Middleware
   - Verify JWT signature
   - Check expiration
   ↓
7. Route Handler
   - Validate request body
   - Create SQLAlchemy model
   ↓
8. Database
   - Insert record
   - Return created item
   ↓
9. Response
   - JSON serialization
   - Status code 201
   ↓
10. Frontend
    - Update UI
    - Invalidate cache
```

## 📈 Scalability Considerations

### Current Architecture
- Suitable for 1-1000 users
- Single server deployment
- Vertical scaling

### Future Improvements
- Load balancing (multiple backends)
- Database replication (read replicas)
- CDN for static assets
- Redis for distributed caching
- Kubernetes for orchestration

## 🧪 Testing Strategy

### Backend
- Unit tests (pytest)
- Integration tests (database)
- API tests (httpx)
- Mock external services

### Frontend
- Component tests (React Testing Library)
- Integration tests (Playwright)
- E2E tests (Cypress)

## 📝 Best Practices

### Code Organization
- Feature-based structure
- Clear separation of concerns
- Consistent naming conventions
- Type safety everywhere

### Error Handling
- Graceful degradation
- User-friendly error messages
- Logging for debugging
- Sentry for production monitoring

### Performance
- Database query optimization
- Lazy loading
- Code splitting
- Image optimization

---

For implementation details, see the [README.md](../README.md)

