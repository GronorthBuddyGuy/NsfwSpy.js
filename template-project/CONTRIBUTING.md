# Contributing to ML Classifier

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git
- TypeScript knowledge
- Familiarity with TensorFlow.js (helpful but not required)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

3. Install dependencies for all packages:
   ```bash
   # Browser package
   cd browser-package
   npm install
   cd ..

   # Node package
   cd node-package
   npm install
   cd ..

   # Demo
   cd demo
   npm install
   cd ..

   # Performance testing
   cd performance-testing
   npm install
   cd ..
   ```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Build packages:
   ```bash
   cd browser-package && npm run build && cd ..
   cd node-package && npm run build && cd ..
   ```

4. Test your changes:
   ```bash
   cd demo && npm start
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

### Code Style

- Use TypeScript strict mode
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Use meaningful variable and function names
- Keep functions focused and small

### Example of Good Code Style

```typescript
/**
 * Processes an image and returns classification result
 * @param image - Image to process
 * @returns Promise resolving to classification result
 */
async processImage(image: ImageData): Promise<Result> {
    // Implementation
}
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update version numbers following [SemVer](https://semver.org/)
3. Ensure all builds pass
4. Create a Pull Request with a clear title and description

### PR Checklist

- [ ] Code builds without errors
- [ ] Changes are tested
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No breaking changes (or clearly documented)

## Types of Contributions

### Bug Reports

File an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)

### Feature Requests

File an issue with:
- Clear description of the feature
- Use cases
- Possible implementation approach (optional)

### Code Contributions

Areas where contributions are welcome:
- Bug fixes
- Performance improvements
- Documentation improvements
- New features (discuss in issue first)
- Test coverage improvements

## Package-Specific Guidelines

### Browser Package

- Must work in modern browsers (Chrome, Firefox, Safari, Edge)
- Keep bundle size minimal
- Avoid Node.js specific APIs

### Node Package

- Must work on Node.js 16+
- Can use Node.js specific features
- Handle file system operations safely

### Demo App

- Keep UI responsive
- Maintain accessibility
- Test on mobile devices
- Follow React best practices

## Testing

### Manual Testing

1. Build packages
2. Run demo application
3. Test with various images
4. Verify results are accurate

### Performance Testing

```bash
cd performance-testing
npm test
```

## Versioning

We use [SemVer](https://semver.org/) for versioning:

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to:
- Open an issue
- Email: your-email@example.com
- Start a discussion in GitHub Discussions

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Recognition

Contributors will be recognized in the README and release notes.

Thank you for contributing! 🎉
