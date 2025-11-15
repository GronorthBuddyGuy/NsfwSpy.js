# Setup Guide

Complete setup guide for the ML Classifier template project.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Package Setup](#package-setup)
3. [Model Setup](#model-setup)
4. [Demo Setup](#demo-setup)
5. [GitHub Pages Setup](#github-pages-setup)
6. [npm Publishing Setup](#npm-publishing-setup)
7. [Troubleshooting](#troubleshooting)

## Initial Setup

### 1. Clone or Use Template

**Option A: Use as Template**
```bash
# On GitHub, click "Use this template" button
```

**Option B: Clone Repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Update Project Information

Replace placeholders in these files:

**package.json files:**
- `@your-scope/browser` → `@yourcompany/yourproject-browser`
- `@your-scope/node` → `@yourcompany/yourproject-node`
- `your-username` → your GitHub username
- `your-repo` → your repository name
- `Your Name` → your name
- `your-email@example.com` → your email

**Files to update:**
- `/package.json`
- `/browser-package/package.json`
- `/node-package/package.json`
- `/demo/package.json`
- `/performance-testing/package.json`
- `/README.md`
- `/LICENSE` (update copyright year and name)

### 3. Initialize Git (if not cloned)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

## Package Setup

### Browser Package

```bash
cd browser-package
npm install
npm run build
```

**Verify:**
```bash
ls dist/  # Should contain index.js and index.d.ts
```

### Node Package

```bash
cd ../node-package
npm install
npm run build
```

**Verify:**
```bash
ls dist/  # Should contain index.js and index.d.ts
```

## Model Setup

### Option 1: Use Existing TensorFlow.js Model

1. Export your model to TensorFlow.js format
2. Place model files in a directory (e.g., `/models/v1.0.0/`)
3. Update model path in demo and tests

### Option 2: Train New Model

If you need to train a model:

1. **Prepare training data** (organized by category)
2. **Train model** using TensorFlow/Keras
3. **Convert to TensorFlow.js:**

```python
import tensorflowjs as tfjs

tfjs.converters.save_keras_model(model, './models/v1.0.0')
```

4. **Upload to repository:**

```bash
git add models/
git commit -m "Add model files"
git push
```

### Option 3: Load from URL

Configure to load model from external URL:

```typescript
const classifier = new MLClassifier("https://example.com/model/model.json");
```

## Demo Setup

### 1. Install Dependencies

```bash
cd demo
npm install
```

### 2. Update Configuration

Edit `demo/package.json`:
```json
{
  "homepage": "https://your-username.github.io/your-repo"
}
```

Edit `demo/src/App.tsx`:
```typescript
const classifier = new MLClassifier("./model/model.json");
```

### 3. Add Model Files

Copy model to demo public folder:
```bash
mkdir -p demo/public/model
cp -r ../models/v1.0.0/* demo/public/model/
```

### 4. Test Locally

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

## GitHub Pages Setup

### Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Source: **GitHub Actions**
4. Save

### First Deployment

**Option A: Automatic (via GitHub Actions)**
```bash
git push origin main
```

GitHub Actions will automatically build and deploy.

**Option B: Manual**
```bash
cd demo
npm run deploy
```

### Verify Deployment

Visit: `https://your-username.github.io/your-repo`

## npm Publishing Setup

### 1. Create npm Account

Visit [npmjs.com](https://www.npmjs.com/) and create account.

### 2. Create Access Token

1. Go to Account Settings → Access Tokens
2. Generate New Token → Classic Token
3. Select "Automation" type
4. Copy token

### 3. Add Token to GitHub Secrets

1. Repository Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `NPM_TOKEN`
4. Value: your npm token
5. Save

### 4. Update Package Scopes

Ensure package names are available on npm:
```bash
npm search @your-scope/browser
npm search @your-scope/node
```

### 5. Publish Packages

**Manual Publishing:**
```bash
cd browser-package
npm login
npm publish --access public

cd ../node-package
npm publish --access public
```

**Automated Publishing:**

Create a GitHub release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Then create release on GitHub. The workflow will auto-publish.

## Performance Testing Setup

### 1. Organize Test Data

```bash
mkdir -p performance-testing/test-data/{category1,category2,category3,category4}
```

### 2. Add Test Images

Place images in respective category folders.

### 3. Run Tests

```bash
cd performance-testing
npm install
npm test
```

## Verification Checklist

- [ ] All packages build successfully
- [ ] Demo runs locally
- [ ] Model loads correctly
- [ ] Image classification works
- [ ] GitHub Pages deploys
- [ ] Documentation is updated
- [ ] License is updated

## Common Issues

See [Troubleshooting](#troubleshooting) section below.

## Troubleshooting

### Build Errors

**TypeScript errors:**
```bash
# Clean and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Missing dependencies:**
```bash
npm install
```

### Demo Issues

**Model not loading:**
- Check model path is correct
- Verify model files are in `public/model/`
- Check browser console for errors
- Ensure CORS is configured (if loading from URL)

**Images not classifying:**
- Check model is loaded (watch console)
- Verify image format is supported
- Check TensorFlow.js version compatibility

### GitHub Pages Issues

**404 errors:**
- Verify `homepage` in package.json
- Check GitHub Pages is enabled
- Ensure files are in `gh-pages` branch or configured correctly

**Build fails:**
- Check GitHub Actions logs
- Verify all dependencies are in package.json
- Check for missing model files

### npm Publishing Issues

**Permission denied:**
- Verify npm token is correct
- Check package name is available
- Ensure you have publish access

**Build artifacts missing:**
- Run `npm run build` before publishing
- Verify `dist/` directory exists
- Check `.gitignore` doesn't exclude necessary files

## Next Steps

After setup:

1. Customize the UI in `demo/`
2. Train and add your model
3. Update documentation
4. Test thoroughly
5. Share your project!

## Getting Help

- GitHub Issues: [your-repo/issues](https://github.com/your-username/your-repo/issues)
- Email: your-email@example.com

## Additional Resources

- [TensorFlow.js Guide](https://www.tensorflow.org/js/guide)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
