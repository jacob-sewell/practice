import parensSubstring from '..';

describe('Test parensSubstring()', (): void => {
    it('Throws an error if given a string that has anything but parentheses in it', (): void => {
        expect((): number => parensSubstring('foo')).toThrow(
            'Invalid character'
        );
    });
    it('Returns 2 for "()"', (): void => {
        expect(parensSubstring('()')).toEqual(2);
    });
    it('Returns 2 for "()(((((((((((("', (): void => {
        expect(parensSubstring('()((((((((((((')).toEqual(2);
    });
    it('Returns 4 for "(())"', (): void => {
        expect(parensSubstring('(())')).toEqual(4);
    });
    it('Returns 2 for "(()("', (): void => {
        expect(parensSubstring('(()(')).toEqual(2);
    });
    it('Returns 6 for ")()(()))"', (): void => {
        expect(parensSubstring(')()(()))')).toEqual(6);
    });
    it('Returns 0 for "", "(((", ")))", and ")("', (): void => {
        expect(parensSubstring('')).toEqual(0);
        expect(parensSubstring('(((')).toEqual(0);
        expect(parensSubstring(')))')).toEqual(0);
        expect(parensSubstring(')(')).toEqual(0);
    });
});
