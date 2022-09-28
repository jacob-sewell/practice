import longestWord from '../src/index';
describe('Test longest subsequence function with dictionary ["able", "ale", "apple", "bale", "kangaroo"]', (): void => {
  const dict = new Set(['able', 'ale', 'apple', 'bale', 'kangaroo']);
  it('should return "apple" for "abppplee"', (): void => {
    expect(longestWord('abppplee', dict)).toEqual('apple');
  });
  it('should return "" for "flapjack"', (): void => {
    expect(longestWord('flapjack', dict)).toEqual('');
  });
});
