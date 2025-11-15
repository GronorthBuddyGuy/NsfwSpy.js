# Node.js ML Library

Machine learning library optimized for Node.js with TensorFlow.js native bindings for better performance.

## Installation

```bash
npm install @your-scope/node
```

## Usage

### Basic Example (TypeScript)

```typescript
import { MLClassifier } from '@your-scope/node';

// Create classifier instance (use file:// prefix for local files)
const classifier = new MLClassifier("file://./model/model.json");

// Load the model
await classifier.load();

// Classify from file path
const result = await classifier.classifyImageFile("./images/photo.jpg");

console.log("Predicted:", result.predictedLabel);
console.log("Probabilities:", result.toDictionary());
```

### Basic Example (JavaScript/CommonJS)

```javascript
const { MLClassifier } = require('@your-scope/node');

(async () => {
    const classifier = new MLClassifier("file://./model/model.json");
    await classifier.load();

    const result = await classifier.classifyImageFile("./images/photo.jpg");
    console.log(result);
})();
```

### Classify from Buffer

```typescript
import * as fs from 'fs';

const imageBuffer = fs.readFileSync("./images/photo.jpg");
const result = await classifier.classifyImageFromByteArray(imageBuffer);
```

### Classify from URL

```typescript
const result = await classifier.classifyImageFromUrl(
    "https://example.com/image.jpg"
);
```

### With Progress Tracking

```typescript
await classifier.load({
    onProgress: (progress) => {
        console.log(`Loading model... ${(progress * 100).toFixed(2)}%`);
    }
});
```

### Batch Processing

```typescript
import * as fs from 'fs';
import * as path from 'path';

const classifier = new MLClassifier("file://./model/model.json");
await classifier.load();

const imageDir = "./images";
const files = fs.readdirSync(imageDir);

for (const file of files) {
    const filePath = path.join(imageDir, file);
    try {
        const result = await classifier.classifyImageFile(filePath);
        console.log(`${file}: ${result.predictedLabel} (${result.category1.toFixed(4)})`);
    } catch (error) {
        console.error(`Failed to process ${file}:`, error);
    }
}

classifier.dispose();
```

## API Reference

### `MLClassifier`

Main class for image classification in Node.js.

#### Constructor

```typescript
new MLClassifier(modelPath: string)
```

- `modelPath` - Path to TensorFlow.js model JSON file
  - Use `file://./path/to/model.json` for local files
  - Use `https://...` for remote models

#### Methods

##### `load(options?: tf.io.LoadOptions): Promise<void>`

Loads the ML model.

- `options.onProgress` - Optional callback for load progress

##### `classifyImageFile(filePath: string): Promise<ClassificationResult>`

Classifies an image from a file path.

- `filePath` - Path to image file (JPEG, PNG, GIF, BMP)

##### `classifyImageFromByteArray(imageBuffer: Buffer): Promise<ClassificationResult>`

Classifies an image from a Node.js Buffer.

- `imageBuffer` - Image data as Buffer

##### `classifyImageFromUrl(imageUrl: string): Promise<ClassificationResult>`

Classifies an image from a URL.

- `imageUrl` - HTTP or HTTPS URL to image

##### `dispose(): void`

Frees model memory.

### `ClassificationResult`

Result object containing classification probabilities.

#### Properties

- `category1: number` - Probability for category 1
- `category2: number` - Probability for category 2
- `category3: number` - Probability for category 3
- `category4: number` - Probability for category 4
- `predictedLabel: CategoryType` - Highest probability category
- `isPositive: boolean` - Whether result meets threshold

#### Methods

##### `toDictionary(): Array<{key: CategoryType, value: number}>`

Returns categories sorted by probability (highest first).

## Performance

The Node.js package uses native TensorFlow bindings for significantly better performance compared to the browser package:

- Faster model loading
- Lower memory usage
- Better inference speed
- Support for GPU acceleration (when available)

## Memory Management

Always dispose of the classifier when done, especially in long-running applications:

```typescript
classifier.dispose();
```

## Error Handling

```typescript
try {
    const result = await classifier.classifyImageFile("./photo.jpg");
    console.log(result);
} catch (error) {
    if (error.message.includes("not been loaded")) {
        console.error("Model not loaded. Call load() first.");
    } else {
        console.error("Classification failed:", error);
    }
}
```

## License

MIT
