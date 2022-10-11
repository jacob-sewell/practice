/**
 * Recursively calculate the number of ones appearing in all nonnegative integers *less than* 10^exp.
 * @param {number} exp The power of ten that forms the *non-inclusive* ceiling of the range
 * @returns {number} the calculated number of 1s appearing in all nonnegative integers *less than* 10^exp
 */
function numberOfOnesBelowExp(exp: number): number {
    if (exp <= 1) return 1;
    return Math.pow(10, exp - 1) + 10 * numberOfOnesBelowExp(exp - 1);
}

/**
 * Calculate the number of ones appearing in all nonnegative integers less than *or equal to* n.
 * @param {number} n If a float is given, the fractional part will be truncated with Math.floor().
 * @returns {number}
 */
export default function numberOfOnes(n: number): number {
    if (n < 10) return n < 1 ? 0 : 1; // Edge cases

    const nInt: number = Math.floor(n);
    const relevantLog: number = Math.floor(Math.log10(nInt + 1)); // Adding 1 here because we want to get 2 for 99

    const plateau: number = Math.pow(10, relevantLog);
    const onesBelowPlateau: number = numberOfOnesBelowExp(relevantLog);
    const remainder: number = nInt - plateau;
    const firstDigit: number = Math.floor(nInt / plateau);
    let ret: number = onesBelowPlateau;

    if (remainder >= 0) {
        if (firstDigit > 1) {
            ret *= firstDigit; // For the number of times we had to go through all the lower digit cycles to get here
            ret += plateau; // For the number of times the first digit _was_ 1.
        } else {
            ret += 1 + remainder; // For the leading 1s in the current incomplete cycle of the lower digits
        }

        ret += numberOfOnes(remainder % plateau); // For the trailing 1s in the current incomplete cycles of the lower digits
    }
    return ret;
}
