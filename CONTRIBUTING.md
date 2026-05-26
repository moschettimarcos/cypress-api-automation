# Contributing to Cypress API Automation Framework

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots or error messages (if applicable)
- Environment details (OS, Node.js version, Cypress version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear description of the enhancement
- Use cases and benefits
- Potential implementation approach (if known)

## 📝 Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/cypress-api-automation.git
cd cypress-api-automation
```

3. Install dependencies:
```bash
npm install
```

4. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

5. Make your changes
6. Run tests:
```bash
npm test
```

7. Commit your changes:
```bash
git commit -m "feat: add your feature description"
```

8. Push to your fork:
```bash
git push origin feature/your-feature-name
```

9. Create a pull request

## 🎯 Coding Standards

### JavaScript/Cypress

- Use meaningful variable and function names
- Follow existing code style and formatting
- Add comments for complex logic
- Keep functions small and focused
- Use custom commands for reusable operations
- Separate test data into fixtures

### Test Structure

- Organize tests by HTTP method or feature
- Use descriptive test names
- Group related tests with `describe` blocks
- Use `beforeEach`/`afterEach` for setup/teardown
- Validate responses appropriately

### File Naming

- Test files: `*.cy.js`
- Fixture files: `*.json`
- Use kebab-case for file names
- Match folder structure to test organization

## 📋 Commit Message Convention

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add OAuth 2.0 authentication tests
fix: resolve schema validation error handling
docs: update README with new features
```

## 🧪 Testing

- Ensure all tests pass before submitting
- Add tests for new functionality
- Test on multiple browsers if applicable
- Verify no regressions in existing tests

## 📖 Documentation

- Update README.md for significant changes
- Add inline comments for complex code
- Document new custom commands
- Update environment variable documentation

## ✅ Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] PR description clearly describes changes
- [ ] No merge conflicts

## 🚀 Release Process

Releases are managed by project maintainers. For major changes, discuss with maintainers first.

## 💬 Communication

- Be respectful and constructive
- Ask questions if unsure
- Provide helpful feedback to others
- Share knowledge and learn from others

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
