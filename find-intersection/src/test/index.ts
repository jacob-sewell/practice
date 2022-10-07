import type { arrayIntersection } from './types';

export default function findIntersection(
    A: unknown[],
    B: unknown[]
): arrayIntersection | null {
    const tail: unknown[] = [];
    const listA: unknown[] = [...A];
    const listB: unknown[] = [...B];
    let lastA: unknown;
    let lastB: unknown;

    // Fill the tail array with every matching pair from the ends of the input lists
    do {
        lastA = listA.pop();
        lastB = listB.pop();
        if (lastA === lastB) tail.push(lastA);
    } while (lastA === lastB);

    // If tail is not empty, we calculate the indicies of the intersection.
    // Otherwise, there were no matching pairs at the end and we return null.
    return tail.length
        ? [A.length - tail.length, B.length - tail.length]
        : null;
}
