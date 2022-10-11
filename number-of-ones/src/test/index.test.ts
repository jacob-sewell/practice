import numberOfOnes from '..';

describe('Test numberOfOnes()', (): void => {
    it('returns 0 for 0 or negative numbers', (): void => {
        expect(numberOfOnes(0)).toEqual(0);
        expect(numberOfOnes(-900)).toEqual(0);
    });
    it('returns 1 for any nonnegative number less than 10', (): void => {
        for (let i = 1; i < 10; i++) {
            expect(numberOfOnes(i)).toEqual(1);
        }
    });
    it('returns n-7 for any integer from 11 to 19', (): void => {
        for (let n = 11; n < 20; n++) {
            expect(numberOfOnes(n)).toEqual(n - 7);
        }
    });

    // Now for some very ugly brute force checking
    let onesCount = 0;
    const floor = 1;
    const ceiling = Math.pow(10, 8);
    let powIdx = 0;
    for (let n = floor; n <= ceiling; n++) {
        const onesMatch = n.toString(10).match(/1/g);
        onesCount += onesMatch ? onesMatch.length : 0;
        if (n.toString(10).match(/^9+$/)) {
            powIdx++;
            expectResult(n, onesCount);
        }
        if (n.toString(10).match(/^10*$/)) {
            expectResult(n, onesCount);
        }
        if ((n.toString(10).match(/7/g) || []).length === powIdx - 1) {
            expectResult(n, onesCount);
        }
    }
});

function expectResult(inNum: number, outNum: number) {
    it(`returns ${outNum} for ${inNum}`, (): void => {
        expect(numberOfOnes(inNum)).toEqual(outNum);
    });
}
