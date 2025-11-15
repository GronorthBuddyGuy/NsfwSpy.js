# Performance Testing Suite

Benchmarking and accuracy testing for the ML Classifier library.

## Features

- Batch image processing
- Accuracy calculation per category
- Performance metrics (time, throughput)
- Interactive CLI interface
- Detailed reporting with misclassification analysis

## Setup

### Install Dependencies

```bash
npm install
```

### Organize Test Data

Create test directories with images organized by category:

```
test-data/
├── category1/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── category2/
│   ├── image1.jpg
│   └── ...
├── category3/
│   └── ...
└── category4/
    └── ...
```

## Usage

### Run Tests

```bash
npm test
```

The script will prompt for:
- Model path (default: `file://../models/model.json`)
- Test data directory (default: `./test-data`)

### Example Output

```
=== ML Classifier Performance Test ===

Loading model...
Model loading... 100.00%
✓ Model loaded successfully

Testing category1 (100 images)...
  Progress: 100/100 | Accuracy: 85.00%

Testing category2 (100 images)...
  Progress: 100/100 | Accuracy: 92.00%

Total runtime: 45.231s

============================================================
PERFORMANCE SUMMARY
============================================================

Total Images Tested: 400
Overall Accuracy: 87.50%

Category Breakdown:
------------------------------------------------------------

CATEGORY1
  Total: 100
  Correct: 85
  Accuracy: 85.00%
  Distribution:
    category1: 85 (85.00%)
    category3: 10 (10.00%)
    category2: 5 (5.00%)

...
```

## Programmatic Usage

```typescript
import { MLClassifier } from '@your-scope/node';
import * as fs from 'fs';

const classifier = new MLClassifier("file://./model/model.json");
await classifier.load();

const testFiles = fs.readdirSync('./test-images');
let correct = 0;
let total = 0;

for (const file of testFiles) {
    const result = await classifier.classifyImageFile(`./test-images/${file}`);
    total++;
    if (result.predictedLabel === expectedLabel) {
        correct++;
    }
}

const accuracy = (correct / total) * 100;
console.log(`Accuracy: ${accuracy.toFixed(2)}%`);

classifier.dispose();
```

## Performance Tips

1. **Use file:// prefix** for local models to avoid network overhead
2. **Batch processing** - Process multiple images without reloading model
3. **Memory management** - Call `dispose()` when done
4. **Image formats** - Use JPEG for faster decoding
5. **Image size** - Smaller images load faster (model will resize anyway)

## Metrics Explained

### Accuracy
Percentage of images correctly classified in their expected category.

### Distribution
Shows how misclassified images were distributed across other categories.

### Total Runtime
Time taken to process all images (excluding model load time).

## Comparing Libraries

To compare performance with other libraries:

1. Install competitor library: `npm install competitor-lib`
2. Modify `src/index.ts` to add competitor testing
3. Run tests with same dataset
4. Compare accuracy and runtime

## License

MIT
