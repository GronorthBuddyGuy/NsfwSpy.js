import { MLClassifier, ClassificationResult, CategoryType } from '@your-scope/node';
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Performance testing framework for ML classifier
 * Supports batch testing and accuracy calculation
 */

interface TestConfig {
    modelPath: string;
    testDataPath: string;
    categories: CategoryType[];
}

class PerformanceResult {
    key: string;
    results: ClassificationResult[];

    constructor(key: string) {
        this.key = key;
        this.results = [];
    }

    get correctAsserts(): number {
        return this.results.filter((r) => r.predictedLabel === this.key).length;
    }

    get totalAsserts(): number {
        return this.results.length;
    }

    get accuracy(): number {
        return this.totalAsserts > 0 ? (this.correctAsserts / this.totalAsserts) * 100 : 0;
    }

    get categoryBreakdown(): Record<string, number> {
        const breakdown: Record<string, number> = {};
        this.results.forEach(r => {
            breakdown[r.predictedLabel] = (breakdown[r.predictedLabel] || 0) + 1;
        });
        return breakdown;
    }
}

async function runPerformanceTest(config: TestConfig) {
    console.log('\n=== ML Classifier Performance Test ===\n');

    const classifier = new MLClassifier(config.modelPath);
    const results: PerformanceResult[] = [];

    // Load model
    console.log('Loading model...');
    await classifier.load({
        onProgress: (progress) => {
            process.stdout.write(`\rModel loading... ${(progress * 100).toFixed(2)}%`);
        }
    });
    console.log('\n✓ Model loaded successfully\n');

    console.time("Total runtime");

    // Test each category
    for (const category of config.categories) {
        const testDir = path.join(config.testDataPath, category);

        // Check if directory exists
        if (!fs.existsSync(testDir)) {
            console.log(`⚠ Skipping ${category} - directory not found: ${testDir}`);
            continue;
        }

        const testFiles = fs.readdirSync(testDir)
            .filter(f => /\.(jpg|jpeg|png|gif|bmp)$/i.test(f))
            .map(f => path.join(testDir, f));

        if (testFiles.length === 0) {
            console.log(`⚠ Skipping ${category} - no image files found`);
            continue;
        }

        console.log(`\nTesting ${category} (${testFiles.length} images)...`);
        const pr = new PerformanceResult(category);

        for (let i = 0; i < testFiles.length; i++) {
            const testFile = testFiles[i];

            try {
                const result = await classifier.classifyImageFile(testFile);
                pr.results.push(result);

                // Progress indicator
                if ((i + 1) % 10 === 0 || i === testFiles.length - 1) {
                    process.stdout.write(
                        `\r  Progress: ${i + 1}/${testFiles.length} | ` +
                        `Accuracy: ${pr.accuracy.toFixed(2)}%`
                    );
                }
            } catch (error) {
                console.error(`\n  ✗ Failed to classify ${path.basename(testFile)}: ${error}`);
            }
        }

        console.log(); // New line after progress
        results.push(pr);
    }

    console.timeEnd("Total runtime");

    // Print summary
    printSummary(results);

    // Cleanup
    classifier.dispose();
}

function printSummary(results: PerformanceResult[]) {
    console.log('\n' + '='.repeat(60));
    console.log('PERFORMANCE SUMMARY');
    console.log('='.repeat(60) + '\n');

    // Overall statistics
    const totalTests = results.reduce((sum, pr) => sum + pr.totalAsserts, 0);
    const totalCorrect = results.reduce((sum, pr) => sum + pr.correctAsserts, 0);
    const overallAccuracy = totalTests > 0 ? (totalCorrect / totalTests) * 100 : 0;

    console.log(`Total Images Tested: ${totalTests}`);
    console.log(`Overall Accuracy: ${overallAccuracy.toFixed(2)}%\n`);

    // Per-category results
    console.log('Category Breakdown:');
    console.log('-'.repeat(60));

    results.forEach(pr => {
        console.log(`\n${pr.key.toUpperCase()}`);
        console.log(`  Total: ${pr.totalAsserts}`);
        console.log(`  Correct: ${pr.correctAsserts}`);
        console.log(`  Accuracy: ${pr.accuracy.toFixed(2)}%`);

        // Show misclassifications
        const breakdown = pr.categoryBreakdown;
        if (Object.keys(breakdown).length > 1) {
            console.log(`  Distribution:`);
            Object.entries(breakdown).forEach(([cat, count]) => {
                const pct = ((count / pr.totalAsserts) * 100).toFixed(2);
                console.log(`    ${cat}: ${count} (${pct}%)`);
            });
        }
    });

    console.log('\n' + '='.repeat(60) + '\n');
}

// Interactive CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

(async () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  ML Classifier Performance Testing     ║');
    console.log('╚════════════════════════════════════════╝\n');

    try {
        // Get configuration
        const modelPath = await question('Model path (default: file://../models/model.json): ') || 'file://../models/model.json';
        const testDataPath = await question('Test data directory (default: ./test-data): ') || './test-data';

        const config: TestConfig = {
            modelPath,
            testDataPath,
            categories: ['category1', 'category2', 'category3', 'category4']
        };

        rl.close();

        await runPerformanceTest(config);

    } catch (error) {
        console.error('\n✗ Error:', error);
        rl.close();
        process.exit(1);
    }
})();
