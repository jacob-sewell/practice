import numberOfOnes from '..';

describe('Test numberOfOnes for 0 or negative numbers', (): void => {
    expectIt(0, 0);
    expectIt(-900, 0);
});
describe('Test numberOfOnes for small easy-to-check numbers', (): void => {
    for (let i = 2; i < 10; i += 2) {
        expectIt(i, 1);
    }
    for (let n = 11; n < 20; n++) {
        expectIt(n, n - 7);
    }
});
describe('Test numberOfOnes input truncation', (): void => {
    for (let i = 1; i < 30; i += 4) {
        expectIt(
            i + 0.5,
            numberOfOnes(i),
            `returns the same result for ${i + 0.5} as it does for ${i}`
        );
    }
});
describe('Test numberOfOnes on large numbers with ugly brute-force checks', (): void => {
    let onesCount = 0;
    const floor = 1;
    const ceiling = Math.pow(10, 8);
    const longRange: [number, number][] = [];
    const nines: [number, number][] = [];
    const powersOfTen: [number, number][] = [];
    const messyMiddle: [number, number][] = [];
    for (let n = floor; n <= ceiling; n++) {
        const nStr: string = n.toString(10);
        const onesMatch = nStr.match(/1/g);
        onesCount += onesMatch ? onesMatch.length : 0;
        if (22200 < n && n < 22300) {
            longRange.push([n, onesCount]);
        } else if (nStr.match(/^9+$/)) {
            nines.push([n, onesCount]);
        } else if (nStr.match(/^10*$/)) {
            powersOfTen.push([n, onesCount]);
        } else if (nStr.match(/^1?0*(37)+$/)) {
            messyMiddle.push([n, onesCount]);
        }
    }
    it('works on a long range from the 22200s', (): void => {
        longRange.forEach(expectResult);
    });
    it('works on numbers that are one less than a power of 10', (): void => {
        nines.forEach(expectResult);
    });
    it('works on the powers of ten', (): void => {
        powersOfTen.forEach(expectResult);
    });
    it('works on some numbers selected from the messy middle', (): void => {
        messyMiddle.forEach(expectResult);
    });
});

function expectIt(inNum: number, outNum: number, testStr = '') {
    it(testStr || `returns ${outNum} for ${inNum}`, (): void => {
        expectResult([inNum, outNum]);
    });
}

function expectResult([inNum, outNum]: [number, number]): void {
    expect(numberOfOnes(inNum)).toEqual(outNum);
}
