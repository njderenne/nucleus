# Contributing to Nucleus

Thank you for your interest in contributing to Nucleus! This document provides guidelines and instructions for contributing.

## 🌟 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, Docker version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

- A clear description of the feature
- Use cases and benefits
- Any implementation ideas you have

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

## 💻 Development Setup

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/your-username/nucleus.git
cd nucleus

# Set up environment
make setup

# Start development environment
make dev
```

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run backend
uvicorn app.main:app --reload

# Run tests
pytest

# Format code
black app/
isort app/
```

### Frontend Development

```bash
cd frontend
npm install

# Run frontend
npm run dev

# Run tests
npm test

# Format code
npm run format
```

## 📝 Coding Standards

### Python (Backend)

- Follow PEP 8
- Use type hints
- Write docstrings for functions and classes
- Use `black` for formatting
- Use `isort` for import sorting
- Write tests for new features

### TypeScript (Frontend)

- Use TypeScript strict mode
- Follow React best practices
- Use functional components and hooks
- Write meaningful component names
- Add comments for complex logic
- Write tests for components

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Example:
```
Add pantry item expiration notifications

- Implement background job to check expiring items
- Send email notifications 3 days before expiration
- Add user preference for notification frequency

Fixes #123
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
pytest --cov=app  # With coverage
```

### Frontend Tests

```bash
cd frontend
npm test
npm run test:coverage
```

## 📚 Documentation

- Update README.md for user-facing changes
- Update code comments for developer-facing changes
- Add JSDoc/docstrings for new functions
- Update API documentation if endpoints change

## 🏗️ Project Structure

```
nucleus/
├── frontend/         # Next.js application
├── backend/          # FastAPI application
├── nginx/            # Nginx configuration
├── scripts/          # Utility scripts
├── .github/          # GitHub workflows
└── docs/             # Additional documentation
```

## 🤝 Code Review Process

1. All submissions require review
2. Maintainers will review your PR
3. Address any requested changes
4. Once approved, your PR will be merged

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on what is best for the community
- Show empathy towards others

## 🎯 Good First Issues

Look for issues labeled `good-first-issue` to get started!

## 💬 Getting Help

- Create an issue for bugs or questions
- Join discussions for feature ideas
- Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Nucleus! 🧠✨

