import { COLORS, RANKS } from '../constants';
import Joker from '../class/Joker';
import Tile from '../class/Tile';
import Tray from '../class/Tray';
import TileSet from '../class/TileSet';

describe('Test Rummikub tray creation', (): void => {
    const defaultTray: Tray = new Tray();
    it('Respects default starting size', (): void => {
        expect(defaultTray.tiles.length).toEqual(Tray.STARTING_SIZE);
    });

    const tripleTileCount: number = Tray.STARTING_SIZE * 3;
    const tripleTray: Tray = new Tray(tripleTileCount);
    it('Respects specified starting size', (): void => {
        expect(tripleTray.tiles.length).toEqual(tripleTileCount);
    });

    const maxPossibleTiles = Tray.JOKERS + (Object.keys(COLORS).length * RANKS.length * Tray.RANKED_DUPLICATES);
    const biggestTray = new Tray(maxPossibleTiles + 1);
    it('Does not respect starting sizes that are higher than what is possible', (): void => {
        expect(biggestTray.tiles.length).toEqual(maxPossibleTiles);
    });

    // Count duplicates
    const valueXcount: { [key: string]: number; } = {};
    biggestTray.tiles.forEach((tile: Tile): void => {
        valueXcount[tile.toString()] = (valueXcount[tile.toString()] || 0) + 1;
    });
    const jokerKey: string = new Joker().toString();
    it('Respects max duplicates for Jokers', (): void => {
        const jokerCount: number = valueXcount[jokerKey] || 0;
        expect(jokerCount).toBeLessThanOrEqual(Tray.JOKERS);
    });
    delete valueXcount[jokerKey];
    it('Respects max ranked tile duplicates', (): void => {
        const rankedMax: number = Math.max(...Object.values(valueXcount));
        expect(rankedMax).toBeLessThanOrEqual(Tray.RANKED_DUPLICATES);
        const rankedMin: number = Math.min(...Object.values(valueXcount));
        expect(rankedMin).toBeLessThanOrEqual(Tray.RANKED_DUPLICATES);
    });
});
describe('Test Rummikub set selection', (): void => {
    const maxPossibleTiles = Tray.JOKERS + (Object.keys(COLORS).length * RANKS.length * Tray.RANKED_DUPLICATES);
    const biggestTray = new Tray(maxPossibleTiles + 1);
    it('Finds all sets in a maximum tray', (): void => {
        const allSets = biggestTray.findSets();
        // Testing this with a snapshot is hacky and gross and I should do it better, but I don't want to take the time today.
        expect(allSets.map((ts: TileSet): string => ts.toString())).toMatchSnapshot();
    });
});