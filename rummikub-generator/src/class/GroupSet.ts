import { Color, Rank } from '../types';
import { SET_TYPES } from '../constants';
import Tile from './Tile';
import TileSet from './TileSet';

class GroupSet extends TileSet {
    #jokerCount = 0;
    #colorCount = 0;
    #rankCount = 0;
    protected validityChecked = false;

    get type(): string { return SET_TYPES.GROUP; }
    get isValid(): boolean {
        if (!this.validityChecked) this.checkValidity();
        return ((this.#colorCount + this.#jokerCount) === this.size)
            && (this.#rankCount === 1);
    }
    get isComplete(): boolean { return (this.size === 3) || (this.size === 4); }
    get isFull(): boolean { return this.size >= 4; }

    onTileChange(): void {
        this.validityChecked = false;
    }

    checkValidity(): void {
        const ranksSeen: Set<Rank> = new Set();
        const colorsSeen: Set<Color> = new Set();
        let jokerCount = 0;
        this.tiles.forEach((tile: Tile) => {
            if (tile.isWild) {
                jokerCount++;
            } else {
                if (tile.rank !== 0) ranksSeen.add(tile.rank);
                if (tile.color !== undefined) colorsSeen.add(tile.color);
            }
        });

        this.#jokerCount = jokerCount;
        this.#colorCount = colorsSeen.size;
        this.#rankCount = ranksSeen.size;
        this.validityChecked = true;
    }
}
export default GroupSet;
