import { ClassificationResult } from '@your-scope/browser';

/**
 * Sorts classification results by probability (highest first)
 * @param result - Classification result object
 * @returns Array of [key, value] pairs sorted by probability
 */
export const sortResults = (result: ClassificationResult) => {
    const validKeys = ['category1', 'category2', 'category3', 'category4'];
    const sortableArray = Object.entries(result);
    let sortedArray = sortableArray.sort(([, a], [, b]) => (b as number) - (a as number));
    sortedArray = sortedArray.filter((i) => validKeys.includes(i[0]));
    return sortedArray;
}
