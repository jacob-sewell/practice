import { longText } from '../src/index';
describe('Test cases from the example prompt:', (): void => {
    it('returns "heeellooo wooorld" for "hello world", 3', (): void => {
        expect(longText('hello world', 3)).toEqual('heeellooo wooorld');
    });

    it('returns "looooooooool" for "lol", 10', (): void => {
        expect(longText('lol', 10)).toEqual('looooooooool');
    });

});
