import swapPairs from '..';

describe('Test swapPairs()', (): void => {
    it('Correctly handles an empty array', (): void => {
        expect(swapPairs([])).toEqual([]);
    });
    it('Correctly handles a simple array of numbers with an even number of elements', (): void => {
        expect(swapPairs([1, 2, 3, 4])).toEqual([2, 1, 4, 3]);
    });
    it('Correctly handles a simple array of numbers with an odd number of elements', (): void => {
        expect(swapPairs([1, 2, 3, 4, 5])).toEqual([2, 1, 4, 3, 5]);
    });
});
