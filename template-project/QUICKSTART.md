# Quick Start Guide

Get your ML classifier project up and running in 5 minutes!

## What You Got

A complete, production-ready ML classifier template with:

✅ **Browser Library** - Works in any modern web browser
✅ **Node.js Library** - High-performance server-side processing
✅ **React Demo** - Beautiful, responsive web interface
✅ **Testing Suite** - Benchmark and validate your models
✅ **CI/CD Pipeline** - Automated deployment and publishing
✅ **Zero Cost** - Uses only free tools and services

## File Structure

```
template-project/
├── 📦 browser-package/       # Browser ML library
│   ├── src/index.ts          # Main library code
│   ├── package.json
│   └── README.md
│
├── 📦 node-package/          # Node.js ML library
│   ├── src/index.ts          # Main library code
│   ├── package.json
│   └── README.md
│
├── 🎨 demo/                  # React demo app
│   ├── src/
│   │   ├── App.tsx           # Main app component
│   │   ├── components/       # Reusable components
│   │   ├── functions/        # Utility functions
│   │   └── models/           # TypeScript types
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── package.json
│
├── 🧪 performance-testing/   # Benchmarking suite
│   ├── src/index.ts
│   └── package.json
│
├── 🤖 .github/workflows/     # GitHub Actions
│   ├── build-packages.yml    # Build automation
│   ├── deploy-pages.yml      # Deploy to GitHub Pages
│   └── publish-npm.yml       # Publish to npm
│
└── 📚 Documentation
    ├── README.md             # Main readme
    ├── SETUP.md              # Detailed setup guide
    ├── ARCHITECTURE.md       # Technical architecture
    ├── CONTRIBUTING.md       # Contribution guide
    └── CHANGELOG.md          # Version history
```

## 5-Minute Setup

### Step 1: Customize Your Project (2 min)

Replace these placeholders across all files:

```bash
# Find and replace in all files:
@your-scope/browser    → @yourcompany/yourproject-browser
@your-scope/node       → @yourcompany/yourproject-node
your-username          → your-github-username
your-repo              → your-repository-name
Your Name              → Your Actual Name
your-email@example.com → your.email@example.com
```

**Files to update:**
- All `package.json` files
- `README.md`
- `LICENSE`
- Demo `package.json` (update homepage)

### Step 2: Install Dependencies (2 min)

```bash
# Browser package
cd browser-package
npm install

# Node package
cd ../node-package
npm install

# Demo app
cd ../demo
npm install

# Performance testing
cd ../performance-testing
npm install
```

### Step 3: Test It Out (1 min)

```bash
# Run the demo
cd demo
npm start
```

Open [http://localhost:3000](http://localhost:3000)

**Note:** The demo will show an error until you add a model (see below).

## Adding Your ML Model

### Option 1: Use a Placeholder Model

For testing, you can load from a public URL:

```typescript
// demo/src/App.tsx
const classifier = new MLClassifier("https://example.com/model/model.json");
```

### Option 2: Add Your Own Model

1. Convert your model to TensorFlow.js format
2. Copy model files to `demo/public/model/`
3. The demo will automatically load it from `./model/model.json`

### Option 3: Use the Original NsfwSpy Model

Copy from the parent repository:

```bash
# From template-project directory
cp -r ../models/mobilenet-v1.0.0/* demo/public/model/
```

## Key Files Explained

### Browser Package (`browser-package/src/index.ts`)

```typescript
import { MLClassifier } from '@your-scope/browser';

// Create classifier
const classifier = new MLClassifier("./model/model.json");

// Load model
await classifier.load();

// Classify image
const img = document.getElementById("myImage");
const result = await classifier.classifyImage(img);

console.log(result.predictedLabel); // "category1"
```

### Node.js Package (`node-package/src/index.ts`)

```typescript
import { MLClassifier } from '@your-scope/node';

// Create classifier
const classifier = new MLClassifier("file://./model/model.json");

// Load model
await classifier.load();

// Classify from file
const result = await classifier.classifyImageFile("./photo.jpg");

console.log(result.predictedLabel); // "category1"
```

### Demo App (`demo/src/App.tsx`)

Complete React application with:
- Drag-and-drop file upload
- Real-time classification
- Progress indicators
- Responsive design
- All UI patterns from the audit

### Performance Testing (`performance-testing/src/index.ts`)

CLI tool for batch testing:
- Accuracy calculation
- Performance metrics
- Category breakdown
- Misclassification analysis

## Common Customizations

### Change Category Names

Update in both `browser-package/src/index.ts` and `node-package/src/index.ts`:

```typescript
export type CategoryType = "dogs" | "cats" | "birds" | "other";
```

### Change Colors

Edit `demo/src/App.scss`:

```scss
.secondary {
    color: #yourcolor; // Change brand color
}

&.category1 {
    border-left: 4px solid #yourcolor;
}
```

### Change Logo

Edit `demo/src/components/Logo/Logo.tsx`:

```tsx
<span className="primary">Your</span>
<span className="secondary">Brand</span>
```

## Deploy to GitHub Pages

### One-Time Setup

```bash
# Enable GitHub Pages in repository settings
# Source: GitHub Actions
```

### Deploy

```bash
cd demo
npm run deploy
```

Or push to `main` branch - GitHub Actions will auto-deploy!

## Publish to npm

### One-Time Setup

1. Create npm account at [npmjs.com](https://npmjs.com)
2. Generate access token
3. Add token to GitHub Secrets as `NPM_TOKEN`

### Publish

```bash
# Tag a release
git tag v1.0.0
git push origin v1.0.0
```

Create a GitHub release - packages auto-publish to npm!

## Next Steps

1. ✅ **Customize branding** (colors, logo, names)
2. ✅ **Add your ML model** (or use placeholder)
3. ✅ **Test locally** (`npm start` in demo/)
4. ✅ **Deploy demo** (`npm run deploy` or push to main)
5. ✅ **Publish packages** (create GitHub release)
6. ✅ **Share your project!**

## Testing Checklist

Before deploying:

- [ ] Demo runs locally without errors
- [ ] Model loads correctly
- [ ] Image classification works
- [ ] Results display properly
- [ ] Responsive on mobile
- [ ] All links updated (homepage, repo, etc.)
- [ ] README customized
- [ ] LICENSE updated with your name

## Getting Help

**Read the docs:**
- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guide

**Common issues:**
- Model not loading → Check path and CORS
- Build errors → Run `npm install` in each package
- Demo crashes → Check browser console for errors

## What's Included

### Production-Ready Code

- ✅ TypeScript with strict mode
- ✅ Proper error handling
- ✅ Memory management (dispose patterns)
- ✅ Progress tracking
- ✅ Responsive UI
- ✅ Accessibility considerations

### Infrastructure

- ✅ GitHub Actions (build, test, deploy)
- ✅ npm publishing automation
- ✅ GitHub Pages deployment
- ✅ Version management

### Documentation

- ✅ API documentation
- ✅ Usage examples
- ✅ Setup guides
- ✅ Architecture docs
- ✅ Contributing guidelines

### Zero-Cost Tools

- ✅ TypeScript (free)
- ✅ React (free)
- ✅ TensorFlow.js (free)
- ✅ GitHub Pages (free)
- ✅ GitHub Actions (free tier)
- ✅ npm registry (free)

## Key Features

### Browser Package
- Works in all modern browsers
- Supports multiple image input types
- Progress tracking during load
- Automatic memory management
- Full TypeScript support

### Node.js Package
- 2-3x faster than browser
- File, Buffer, and URL inputs
- Native TensorFlow bindings
- Better memory efficiency
- Same API as browser package

### Demo App
- Beautiful, modern UI
- Drag-and-drop upload
- Real-time classification
- Mobile-responsive
- Dark theme
- Progress indicators

### Performance Testing
- Batch processing
- Accuracy metrics
- Category breakdown
- CLI interface
- Progress tracking
- Detailed reports

## Performance Tips

1. **Model Loading**
   - Use local models for faster loading
   - Cache model in production
   - Show progress to users

2. **Image Processing**
   - Use ImageBitmap in browsers
   - Pre-resize large images
   - Process in batches for Node.js

3. **Memory**
   - Always call `dispose()` when done
   - Use `tf.tidy()` for custom operations
   - Monitor memory in DevTools

## License

MIT - See [LICENSE](./LICENSE) file

## Credits

Built with zero-cost tools:
- TypeScript
- React
- TensorFlow.js
- SASS
- GitHub Pages
- GitHub Actions

---

**Ready to build something amazing? Start customizing!** 🚀
