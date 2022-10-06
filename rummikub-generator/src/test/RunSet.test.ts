import Tile from '../class/Tile';
import Joker from '../class/Joker';
import RankedTile from '../class/RankedTile';
import RunSet from '../class/RunSet';
import { COLORS, RANKS, SET_TYPES } from '../constants';
import { Color, Rank } from '../types';

describe('Test the run set', (): void => {
    const jokers = [new Joker(), new Joker()];

    // create every possible ranked tile
    const tilesByColorAndRank: Map<Color, Map<Rank, Tile>> = new Map();
    Object.values(COLORS).forEach((color: Color) => {
        const colorMap: Map<Rank, Tile> = new Map();
        RANKS.forEach((rank: Rank) => colorMap.set(rank, new RankedTile(rank, color)));
        tilesByColorAndRank.set(color, colorMap);
    });

    it('reports the correct set type', (): void => {
        const group = new RunSet();
        expect(group.type).toEqual(SET_TYPES.RUN);
    });

    it('detects valid/scorable runs', (): void => {
        const group = new RunSet();
        const blackTiles = [...(tilesByColorAndRank.get(COLORS.BLACK)?.values() || [])];

        // Build a minimum run
        do {
            expect(group.isValid).toBeTruthy();
            expect(group.isComplete).toBeFalsy();
            expect(group.isScorable).toBeFalsy();
            expect(group.isFull).toBeFalsy();

            group.tiles = [...group.tiles, blackTiles[group.size]];
        } while (group.size < 3);

        // Build a maximum run
        do {
            expect(group.isValid).toBeTruthy();
            expect(group.isComplete).toBeTruthy();
            expect(group.isScorable).toBeTruthy();
            expect(group.isFull).toBeFalsy();

            group.tiles = [...group.tiles, blackTiles[group.size]];
        } while (group.size < 13);

        expect(group.isValid).toBeTruthy();
        expect(group.isComplete).toBeTruthy();
        expect(group.isScorable).toBeTruthy();
        expect(group.isFull).toBeTruthy();
    });

    it('Detects valid/scorable runs that include one or two Jokers', (): void => {
        const group = new RunSet();
        const blackTiles = [...(tilesByColorAndRank.get(COLORS.BLACK)?.values() || [])];

        // Todo: make section a loop to find edge cases on joker stuff
        // Swap out a tile with a joker
        blackTiles.splice(5, 1, jokers[0]);
        group.tiles = [...blackTiles];
        expect(group.isValid).toBeTruthy();
        expect(group.isComplete).toBeTruthy();
        expect(group.isScorable).toBeTruthy();
        expect(group.isFull).toBeTruthy();

        // Swap out a second tile with a joker
        blackTiles.splice(9, 1, jokers[1]);
        group.tiles = [...blackTiles];
        expect(group.isValid).toBeTruthy();
        expect(group.isComplete).toBeTruthy();
        expect(group.isScorable).toBeTruthy();
        expect(group.isFull).toBeTruthy();
    });

    it('detects valid/scorable runs', (): void => {
        const group = new RunSet();
        const blackTiles = [...(tilesByColorAndRank.get(COLORS.BLACK)?.values() || [])];
        const blueTiles = [...(tilesByColorAndRank.get(COLORS.BLUE)?.values() || [])];
        const tiles = [...blackTiles.slice(0,3), ...jokers, ...blueTiles.slice(4,2)];

        // Build a minimum run
        do {
            expect(group.isValid).toBeTruthy();
            expect(group.isComplete).toBeFalsy();
            expect(group.isScorable).toBeFalsy();
            expect(group.isFull).toBeFalsy();

            group.tiles = [...group.tiles, tiles.shift() || new Joker()];
        } while (group.size < 3);

        // Add Jokers
        do {
            expect(group.isValid).toBeTruthy();
            expect(group.isComplete).toBeTruthy();
            expect(group.isScorable).toBeTruthy();
            expect(group.isFull).toBeFalsy();

            group.tiles = [...group.tiles, tiles.shift() || new Joker()];
        } while (group.size < 5);

        // Add Blue tiles
        while (tiles.length > 0) {
            group.tiles = [...group.tiles, tiles.shift() || new Joker()];

            expect(group.isValid).toBeFalsy();
            expect(group.isComplete).toBeTruthy();
            expect(group.isScorable).toBeFalsy();
            expect(group.isFull).toBeFalsy();
        }
    });
});
