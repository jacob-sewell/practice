import { parenTuple } from './types';

export default function parensSubstring(inStr: string): number {
    const open: Set<parenTuple> = new Set(); // for substrings that might still become valid.
    const closed: Set<parenTuple> = new Set(); // for substrings that are valid but only if they stop right where they are

    for (let idx = 0; idx < inStr.length; idx++) {
        const paren = inStr[idx];
        if (paren === ')') {
            open.forEach((tuple: parenTuple): void => {
                // remove anything that's currently open at depth 0 -- it can't get any longer and it should already be represented in closed
                if (tuple[0] < 1) {
                    open.delete(tuple);
                    return;
                }

                // Decrement the depth and increment the length of everything that's still open
                tuple[0]--;
                tuple[1]++;

                // Copy everything open that's newly at depth 0 into closed
                if (tuple[0] === 0) {
                    closed.add([tuple[0], tuple[1]]);
                }
            });
        } else if (paren === '(') {
            open.forEach((tuple: parenTuple): void => {
                // Increment the depth and length of everything in open
                tuple[0]++;
                tuple[1]++;
            });
            // Create a new open parenTuple with depth 1, length 1
            open.add([1, 1]);
        } else {
            throw new Error(
                `Invalid character "${paren}" in position ${idx}. Expecting "(" or ")".`
            );
        }
    }

    if (closed.size) {
        return Math.max(
            ...[...closed.values()].map(
                ([, length]: parenTuple): number => length
            )
        );
    }
    return 0;
}
