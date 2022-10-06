import { SetType } from '../types';
import Tile from './Tile';

abstract class TileSet {
    #tiles: Set<Tile>;

    /**
     * @returns {SetType} the type of the set: currently GROUP or RUN
     */
    abstract get type(): SetType;
    /**
     * @returns {boolean} True if the tiles satisfy the requirements of the set (but see @isScorable).
     */
    abstract get isValid(): boolean;
    /**
     * @returns {boolean} True if this set has at least the minimum number of tiles to be scorable (currently 3 for all set types) and not more than the maximum.
     */
    abstract get isComplete(): boolean;
    /**
     * @returns {boolean} True if this set is at or above the maximum number of tiles to be scorable.
     */
    abstract get isFull(): boolean;
    /**
     * @returns {boolean} True if the set is valid (meets tile combination requirements) and complete (has a legal number of tiles).
     */
    get isScorable(): boolean { return this.isValid && this.isComplete; }
    
    get tiles(): Tile[] { return [...this.#tiles.values()]; }
    set tiles(inTiles: Tile[]) {
        this.#tiles = new Set(this.sortTiles([...inTiles]));
        this.onTileChange();
    }

    get size(): number { return this.#tiles.size; }

    protected sortTiles(inTiles: Tile[]): Tile[] { return inTiles.sort((a, b) => a.sortValue - b.sortValue); }
    onTileChange(): void { return; }

    toString(): string {
        return `[ Set TYPE:${this.type} | VALID:${this.isValid ? 'YES' : 'NO'} | FULL:${this.isFull ? 'YES' : 'NO'} | TILES:${ this.tiles.map((t) => t.toString()).join('')} ]`;
    }

    constructor(...inTiles: Tile[]) {
        this.#tiles = new Set(this.sortTiles([...inTiles]));
        this.onTileChange();
    }
}
export default TileSet;
