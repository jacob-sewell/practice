import { RANKS, SET_TYPES } from '../constants';
import { Color } from '../types';
import TileSet from './TileSet';
import Tile from './Tile';

class RunSet extends TileSet {
    get isComplete(): boolean {
        return (this.size >= 3) && (this.size <= 13);
    }
    get type(): string { return SET_TYPES.RUN; }
    get isValid(): boolean {
        let jokerCount = 0;
        const colorsPresent: Set<Color | undefined> = new Set();
        const rankedTiles: Tile[] = [];
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].isWild) {
                jokerCount++;
            } else {
                rankedTiles.push(this.tiles[i]);
                if (!this.tiles[i].color) {
                    throw new Error(`Invalid Tile: ${this.tiles[i].toString()}`);
                }
                if (!colorsPresent.has(this.tiles[i].color)) {
                    colorsPresent.add(this.tiles[i].color);
                }
                if (colorsPresent.size > 1) {
                    // We have two different colors represented, so this is not a valid run
                    return false;
                }
            }
        }

        // Now look for gaps in the run and see if we have enough jokers to fill them
        this.sortTiles(rankedTiles);
        let gapCount = 0;
        let prevTile: Tile | undefined = rankedTiles.shift();
        while (rankedTiles.length) {
            const curTile: Tile | undefined = rankedTiles.shift();
            if (prevTile && curTile) {
                // Screen out runs with repeat tiles
                if (prevTile.sameRank(curTile)) {
                    return false;
                }
                // Identify any gaps in the rank series (to see if we have enough jokers to fill them)
                gapCount += Math.max(0, prevTile.rankDiff(curTile.rank) - 1);
            }
            prevTile = curTile;
        }
        return jokerCount >= gapCount;
    }
    get isFull(): boolean { return this.size >= 13; }

}
export default RunSet;
