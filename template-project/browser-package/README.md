# Browser ML Library

Machine learning library optimized for web browsers using TensorFlow.js.

## Installation

```bash
npm install @your-scope/browser
```

## Usage

### Basic Example

```typescript
import { MLClassifier } from '@your-scope/browser';

// Create classifier instance
const classifier = new MLClassifier("./model/model.json");

// Load the model
await classifier.load();

// Classify an image
const img = document.getElementById("myImage") as HTMLImageElement;
const result = await classifier.classifyImage(img);

console.log("Predicted:", result.predictedLabel);
console.log("Probabilities:", result.toDictionary());
```

### With Progress Tracking

```typescript
await classifier.load({
    onProgress: (progress) => {
        console.log(`Loading... ${(progress * 100).toFixed(2)}%`);
    }
});
```

### Using with File Upload

```typescript
const fileInput = document.getElementById('upload') as HTMLInputElement;
fileInput.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        const bitmap = await createImageBitmap(file);
        const result = await classifier.classifyImage(bitmap);
        console.log(result);
    }
});
```

### Script Tag (CDN)

```html
<script src="https://unpkg.com/@your-scope/browser@1.0.0/dist/index.js"></script>
<script>
    const classifier = new MLClassifier("./model/model.json");
    // ... use classifier
</script>
```

## API Reference

### `MLClassifier`

Main class for image classification.

#### Constructor

```typescript
new MLClassifier(modelPath: string)
```

- `modelPath` - Path to TensorFlow.js model JSON file

#### Methods

##### `load(options?: tf.io.LoadOptions): Promise<void>`

Loads the ML model.

- `options.onProgress` - Optional callback for load progress

##### `classifyImage(image): Promise<ClassificationResult>`

Classifies an image.

- `image` - Can be `ImageData`, `HTMLImageElement`, `HTMLCanvasElement`, or `ImageBitmap`

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

## Memory Management

Always dispose of the classifier when done:

```typescript
classifier.dispose();
```

TensorFlow.js handles most memory cleanup automatically, but disposing the model explicitly helps in long-running applications.

## License

MIT
