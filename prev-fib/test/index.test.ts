import prevFib from '../src/index';
describe('Test prevFib with good inputs', (): void => {
    it('Should return 0 for 1', (): void => {
        expect(prevFib(BigInt(1))).toEqual(BigInt(0));
    });
    it('Should return 3 for 5', (): void => {
        expect(prevFib(BigInt(5))).toEqual(BigInt(3));
    });
    it('Should return 196418 for 317811', (): void => {
        expect(prevFib(BigInt(317811))).toEqual(BigInt(196418));
    });
});
describe('Test prevFib with bad inputs', () => {
    it('Should return -1 for 0', (): void => {
        expect(prevFib(BigInt(0))).toEqual(BigInt(-1));
    });
    it('Should return -1 for 317812', (): void => {
        expect(prevFib(BigInt(317812))).toEqual(BigInt(-1));
    });
    it('Should return -1 for -2', (): void => {
        expect(prevFib(BigInt(-2))).toEqual(BigInt(-1));
    });
});