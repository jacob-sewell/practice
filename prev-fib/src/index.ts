/**
 * Build the Fibonacci sequence until we reach or pass the input.
 * If we matched, the given number is in the sequence and we return the one preceding it.
 * If we passed, the given number is not in the sequence and we return -1.
 * @param {BigInt} inNum 
 * @returns {BigInt} Either the previous Fibonacci number, if inNum is in the sequence, or -1.
 */
const prevFib = (inNum: bigint): bigint => {
    const fibs = [BigInt(1), BigInt(0)];
    while (fibs[0] < inNum) {
        fibs.unshift(fibs[0] + fibs[1]);
        fibs.pop();
    }
    if (inNum == fibs[0]) {
        return fibs[1];
    } else {
        return BigInt(-1);
    }
};
export default prevFib;
