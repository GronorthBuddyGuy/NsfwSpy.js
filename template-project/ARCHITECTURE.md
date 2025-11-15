# Architecture Documentation

## Overview

This project implements a machine learning image classifier using TensorFlow.js with separate packages for browser and Node.js environments.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ML Classifier System                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │ Browser Package │         │  Node Package   │            │
│  │  @scope/browser │         │  @scope/node    │            │
│  ├─────────────────┤         ├─────────────────┤            │
│  │ - DOM API       │         │ - File System   │            │
│  │ - ImageData     │         │ - Buffer API    │            │
│  │ - Canvas API    │         │ - HTTP/HTTPS    │            │
│  │ - ImageBitmap   │         │ - Native TF     │            │
│  └────────┬────────┘         └────────┬────────┘            │
│           │                           │                     │
│           └──────────┬────────────────┘                     │
│                      │                                       │
│           ┌──────────▼──────────┐                           │
│           │   TensorFlow.js     │                           │
│           │   Core Engine       │                           │
│           └──────────┬──────────┘                           │
│                      │                                       │
│           ┌──────────▼──────────┐                           │
│           │    ML Model         │                           │
│           │  (MobileNetV2)      │                           │
│           └─────────────────────┘                           │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Demo Application                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React UI → Browser Package → Results Display       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                 Performance Testing                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CLI → Node Package → Batch Processing → Metrics    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Browser Package

**Purpose:** Provide ML capabilities in web browsers

**Key Components:**
- `MLClassifier` class - Main API
- `ClassificationResult` class - Result container
- TensorFlow.js browser bindings

**Input Sources:**
- `ImageData` - From Canvas API
- `HTMLImageElement` - From `<img>` tags
- `HTMLCanvasElement` - From `<canvas>` elements
- `ImageBitmap` - From `createImageBitmap()`

**Dependencies:**
- `@tensorflow/tfjs` - Browser TensorFlow.js

### 2. Node.js Package

**Purpose:** Provide ML capabilities in Node.js with better performance

**Key Components:**
- `MLClassifier` class - Main API (same interface as browser)
- `ClassificationResult` class - Result container
- TensorFlow.js Node.js bindings (native)

**Input Sources:**
- File paths (JPEG, PNG, GIF, BMP)
- Buffers (in-memory image data)
- URLs (HTTP/HTTPS)

**Dependencies:**
- `@tensorflow/tfjs-node` - Native TensorFlow.js bindings

### 3. Demo Application

**Purpose:** Showcase library capabilities

**Architecture:**
```
┌──────────────────────────────────────┐
│         React Application            │
├──────────────────────────────────────┤
│  Components                           │
│  ├── App (main container)            │
│  ├── Logo (branding)                 │
│  └── (inline components)             │
│                                       │
│  Utilities                            │
│  ├── selectFiles (file upload)       │
│  └── sortBy (result sorting)         │
│                                       │
│  Models                               │
│  └── ImageFile (type definition)     │
│                                       │
│  State Management                     │
│  ├── Image state                     │
│  ├── Results state                   │
│  ├── Processing state                │
│  └── Status state                    │
└──────────────────────────────────────┘
```

**Data Flow:**
1. User selects image
2. Image converted to ImageBitmap
3. Passed to classifier
4. Results displayed sorted by probability

### 4. Performance Testing

**Purpose:** Benchmark and validate accuracy

**Architecture:**
```
┌──────────────────────────────────────┐
│     Performance Testing Suite        │
├──────────────────────────────────────┤
│  CLI Interface                        │
│  ├── Interactive prompts             │
│  └── Progress display                │
│                                       │
│  Test Runner                          │
│  ├── Load model                      │
│  ├── Iterate categories              │
│  ├── Process images                  │
│  └── Calculate metrics               │
│                                       │
│  Results Analysis                     │
│  ├── Accuracy per category           │
│  ├── Overall accuracy                │
│  ├── Misclassification breakdown     │
│  └── Performance timing              │
└──────────────────────────────────────┘
```

## Data Flow

### Classification Pipeline

```
Input Image
    │
    ▼
Load as Tensor (3 channels, RGB)
    │
    ▼
Normalize to [0, 1] (divide by 255)
    │
    ▼
Resize to 224x224 (bilinear interpolation)
    │
    ▼
Reshape to [1, 224, 224, 3] (batch dimension)
    │
    ▼
Model Inference
    │
    ▼
Output Probabilities [cat1, cat2, cat3, cat4]
    │
    ▼
Create ClassificationResult
    │
    ▼
Determine predictedLabel (highest probability)
    │
    ▼
Return to caller
```

## Memory Management

### Browser Package

**Automatic Cleanup:**
- `tf.tidy()` automatically disposes intermediate tensors
- Model disposal via `classifier.dispose()`

**Manual Cleanup:**
- Output tensors disposed after extracting data
- Object URLs revoked after use

### Node.js Package

**Same as Browser Package, plus:**
- File handles automatically closed
- Larger memory limit available

## API Design Principles

### 1. Consistent Interface

Both packages expose identical API:
```typescript
new MLClassifier(modelPath)
await load(options?)
await classifyImage(input)
dispose()
```

### 2. Progressive Enhancement

Browser package:
- Basic: HTMLImageElement
- Advanced: ImageBitmap for better performance

Node.js package:
- Basic: File paths
- Advanced: Buffers and URLs

### 3. Error Handling

```typescript
try {
    await classifier.load();
    const result = await classifier.classifyImage(image);
} catch (error) {
    // Handle errors
}
```

## Deployment Architecture

### GitHub Pages Deployment

```
GitHub Repository
    │
    ▼
GitHub Actions Workflow
    │
    ├──→ Install dependencies
    ├──→ Build demo (npm run build)
    ├──→ Upload artifacts
    └──→ Deploy to gh-pages
    │
    ▼
GitHub Pages
(https://username.github.io/repo)
```

### npm Publishing

```
Git Tag/Release
    │
    ▼
GitHub Actions Workflow
    │
    ├──→ Build browser package
    ├──→ Publish to npm (@scope/browser)
    ├──→ Build node package
    └──→ Publish to npm (@scope/node)
```

## Performance Considerations

### Browser Package

**Optimizations:**
- Production mode enabled (`tf.enableProdMode()`)
- Tensor cleanup with `tf.tidy()`
- Efficient image resizing

**Limitations:**
- JavaScript execution (slower than native)
- Browser memory limits
- No GPU acceleration on some devices

### Node.js Package

**Optimizations:**
- Native TensorFlow bindings (C++)
- Better memory management
- Potential GPU acceleration

**Benefits over Browser:**
- ~2-3x faster inference
- Lower memory usage
- No browser limitations

## Security Considerations

1. **Model Loading**
   - Support for both local and remote models
   - HTTPS recommended for remote models
   - CORS considerations for cross-origin

2. **Input Validation**
   - Type checking for inputs
   - Error handling for invalid images
   - File size limits (demo should implement)

3. **Dependencies**
   - Regular updates for TensorFlow.js
   - No unnecessary dependencies
   - Minimal attack surface

## Extensibility

### Adding New Features

1. **New Input Types**
   - Extend input type union
   - Add preprocessing logic
   - Maintain backward compatibility

2. **New Output Formats**
   - Add methods to ClassificationResult
   - Keep existing interface intact

3. **Model Updates**
   - Models are loaded dynamically
   - No code changes needed for new models (same architecture)
   - Version models separately

## Testing Strategy

### Unit Tests (TODO)
- Individual function testing
- Mock TensorFlow.js calls
- Edge case handling

### Integration Tests
- Performance testing suite
- End-to-end classification
- Real model testing

### Manual Testing
- Demo application
- Cross-browser testing
- Real-world images

## Future Improvements

1. **Performance**
   - WebAssembly backend option
   - Model quantization
   - Batch processing in browser

2. **Features**
   - Video classification
   - Real-time camera feed
   - Progressive image loading

3. **Developer Experience**
   - Better error messages
   - Debug mode
   - Profiling tools

## Conclusion

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Platform-specific optimizations
- ✅ Consistent API across platforms
- ✅ Easy to extend and maintain
- ✅ Production-ready patterns
