import { COLORS, RANKS } from '../constants';
import RankedTile from '../class/RankedTile';
import Joker from '../class/Joker';
import Tile from '../class/Tile';

describe('TileInterface class tests', (): void => {
    const jokerOne = new Joker();
    const jokerTwo = new Joker();
    const rankedOne = new RankedTile(RANKS[0], COLORS.BLACK);
    const rankedTwo = new RankedTile(RANKS[0], COLORS.BLACK);
    const rankedThree = new RankedTile(RANKS[1], COLORS.BLUE);
    const rankedFour = new RankedTile(RANKS[2], COLORS.BLUE);

    it('Detects duplicates', (): void => {
        expect(jokerOne == jokerOne).toBeTruthy();
        expect(jokerOne == jokerTwo).toBeFalsy();
        expect(rankedOne == rankedOne).toBeTruthy();
        expect(rankedOne == rankedTwo).toBeFalsy();
        expect(jokerOne.equals(rankedOne)).toBeFalsy();
        expect(rankedOne.equals(jokerOne)).toBeFalsy();
        expect(rankedOne.equals(rankedTwo)).toBeTruthy();
        expect(jokerOne.equals(jokerTwo)).toBeTruthy();
    });

    it('Detects color equality', (): void => {
        expect(jokerOne.sameColor(rankedOne)).toBeTruthy();
        expect(jokerOne.sameColor(jokerOne)).toBeTruthy();
        expect(rankedOne.sameColor(jokerOne)).toBeTruthy();
        expect(rankedOne.sameColor(rankedOne)).toBeTruthy();
        expect(jokerOne.sameColor(rankedThree)).toBeTruthy();
        expect(rankedThree.sameColor(jokerOne)).toBeTruthy();
        expect(rankedThree.sameColor(rankedFour)).toBeTruthy();
        expect(rankedFour.sameColor(rankedThree)).toBeTruthy();

        expect(rankedOne.sameColor(rankedThree)).toBeFalsy();
        expect(rankedThree.sameColor(rankedOne)).toBeFalsy();
    });

    it('Detects rank equality and adjacency', (): void => {
        expect(jokerOne.sameRank(rankedOne)).toBeTruthy();
        expect(jokerOne.sameRank(jokerOne)).toBeTruthy();
        expect(rankedOne.sameRank(jokerOne)).toBeTruthy();
        expect(rankedOne.sameRank(rankedOne)).toBeTruthy();
        expect(jokerOne.sameRank(rankedThree)).toBeTruthy();
        expect(rankedThree.sameRank(jokerOne)).toBeTruthy();
        expect(rankedThree.sameRank(rankedThree)).toBeTruthy();

        expect(rankedOne.sameRank(rankedThree)).toBeFalsy();
        expect(rankedThree.sameRank(rankedOne)).toBeFalsy();
        expect(rankedThree.sameRank(rankedFour)).toBeFalsy();
        expect(rankedFour.sameRank(rankedThree)).toBeFalsy();

        expect(rankedOne.rank - rankedThree.rank).toEqual(-1);
        expect(rankedThree.rank - rankedOne.rank).toEqual(1);
        expect(rankedOne.rank - rankedFour.rank).toEqual(-2);
        expect(rankedFour.rank - rankedOne.rank).toEqual(2);
    });

    it('Serializes properly', (): void => {
        expect(jokerOne.toString()).toEqual('[Joker]');
        expect(rankedOne.toString()).toEqual('[BLACK 1]');
    });

    it('Sorts properly', (): void => {
        const unsorted: Tile[] = [jokerOne, jokerTwo, rankedFour, rankedThree, rankedTwo, rankedOne];
        const sorted: Tile[] = [...unsorted].sort((a: Tile, b: Tile) => a.sortValue - b.sortValue);
        const manuallySorted: Tile[] = [rankedOne, rankedTwo, rankedThree, rankedFour, jokerOne, jokerTwo];
        manuallySorted.forEach((t: Tile, i: number) => {
            expect(t.equals(sorted[i])).toBeTruthy();
            expect(sorted[i].equals(t)).toBeTruthy();
            if ((i > 1) && (i < sorted.length - 1)) { // Don't compare rankedOne to rankedTwo or jokerOne to jokerTwo.
                expect(t.equals(sorted[i-1])).toBeFalsy();
                expect(sorted[i-1].equals(t)).toBeFalsy();
            }
        });
        expect(sorted[0].isWild).toBeFalsy();
        expect(sorted[1].isWild).toBeFalsy();
        expect(sorted[2].isWild).toBeFalsy();
        expect(sorted[3].isWild).toBeFalsy();
        expect(sorted[4].isWild).toBeTruthy();
        expect(sorted[5].isWild).toBeTruthy();
    });
});
