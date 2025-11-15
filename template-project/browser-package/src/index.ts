import * as tf from '@tensorflow/tfjs';

// Enable production mode for better performance
tf.enableProdMode();

/**
 * Main ML library class for browser environments
 * Handles model loading and image classification
 */
export class MLClassifier {
    private imageSize: number;
    private modelPath: string;
    private model: tf.GraphModel | null;

    /**
     * Creates a new MLClassifier instance
     * @param modelPath - Path to the TensorFlow.js model (e.g., "./model/model.json")
     */
    constructor(modelPath: string) {
        this.imageSize = 224;
        this.modelPath = modelPath;
        this.model = null;
    }

    /**
     * Loads the ML model from the specified path
     * @param loadOptions - Optional TensorFlow.js load options with progress callback
     */
    async load(loadOptions?: tf.io.LoadOptions) {
        this.model = await tf.loadGraphModel(this.modelPath, loadOptions);
    }

    /**
     * Classifies an image using the loaded model
     * @param image - Image to classify (ImageData, HTMLImageElement, HTMLCanvasElement, or ImageBitmap)
     * @returns Classification result with probabilities
     */
    async classifyImage(image: ImageData | HTMLImageElement | HTMLCanvasElement | ImageBitmap): Promise<ClassificationResult> {
        const outputs = tf.tidy(() => {
            if (!this.model) {
                throw new Error("The ML model has not been loaded yet. Call load() first.");
            }

            // Decode and normalize image to [0, 1] range
            const decodedImage = tf.browser.fromPixels(image, 3)
                .toFloat()
                .div(tf.scalar(255)) as tf.Tensor3D;

            // Resize to model input size
            const resizedImage = tf.image.resizeBilinear(
                decodedImage,
                [this.imageSize, this.imageSize],
                true
            );

            // Reshape for batch processing [1, height, width, channels]
            const tensor = resizedImage.reshape([1, this.imageSize, this.imageSize, 3]);

            // Run model inference
            return this.model.execute(
                { 'import/input': tensor },
                ['Score']
            ) as tf.Tensor2D;
        });

        // Extract data and clean up tensors
        const data = await outputs.data();
        outputs.dispose();

        return new ClassificationResult(data);
    }

    /**
     * Disposes of the loaded model and frees memory
     */
    dispose() {
        if (this.model) {
            this.model.dispose();
            this.model = null;
        }
    }
}

/**
 * Classification result containing probabilities for each category
 */
export class ClassificationResult {
    category1: number;
    category2: number;
    category3: number;
    category4: number;
    predictedLabel: CategoryType;

    /**
     * Creates a classification result from model output
     * @param results - Raw model output array
     */
    constructor(results: Uint8Array | Float32Array | Int32Array) {
        this.category1 = results[0];
        this.category2 = results[1];
        this.category3 = results[2];
        this.category4 = results[3];
        this.predictedLabel = this.toDictionary()[0].key;
    }

    /**
     * Checks if the classification meets a threshold
     * @returns True if category1 is less than 0.5
     */
    get isPositive(): boolean {
        return this.category2 < 0.5;
    }

    /**
     * Converts the result to a sorted dictionary
     * @returns Array of key-value pairs sorted by probability (descending)
     */
    toDictionary(): { key: CategoryType; value: number }[] {
        const dictionary: { key: CategoryType; value: number }[] = [
            { key: "category1", value: this.category1 },
            { key: "category2", value: this.category2 },
            { key: "category3", value: this.category3 },
            { key: "category4", value: this.category4 }
        ];

        return dictionary.sort((a, b) => b.value - a.value);
    }
}

/**
 * Available classification categories
 */
export type CategoryType = "category1" | "category2" | "category3" | "category4";
