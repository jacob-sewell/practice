import { Rank, Color } from '../types';
import Tile from './Tile';
import { COLORS, RANKS } from '../constants';
class RankedTile extends Tile {
    #rank: Rank;
    #color: Color;

    constructor(rank: Rank, color: Color) {
        super();
        this.#rank = rank;
        this.#color = color;
    }

    get colorIndex(): number { return Object.values(COLORS).indexOf(this.#color); }

    get isWild(): boolean { return false; }
    get rank(): Rank | 0 { return this.#rank; }
    get color(): Color | undefined { return this.#color; }
    get sortValue(): number { return 100 * this.colorIndex + this.rank; }

    toString(): string { return `[${this.#color} ${this.#rank}]`; }
    equals(t: Tile): boolean { return this.toString() == t.toString(); }
    sameColor(t: Tile): boolean { return t.isWild || (t.color === this.#color); }
    sameRank(t: Tile): boolean { return t.isWild || (t.rank === this.#rank); }
    rankDiff(inRank: Rank | 0): number {
        const inRankIdx = inRank ? RANKS.indexOf(inRank) : -1;
        if (this.rank && inRankIdx >= 0) {
            return Math.abs(inRankIdx - RANKS.indexOf(this.rank));
        } else {
            return 0;
        }
    }
}
export default RankedTile;
