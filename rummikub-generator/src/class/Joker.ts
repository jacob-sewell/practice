import { Wild, Rank, Color } from '../types';
import { WILD } from '../constants';
import Tile from './Tile';
class Joker extends Tile {
    get isWild(): boolean { return true; }
    get rank(): Rank | 0 { return 0; }
    get color(): Color | undefined { return undefined; }
    get sortValue(): number { return 9999; }

    toString(): string { return '[Joker]'; }
    equals(t: Tile): boolean { return t.isWild; }
    rankDiff(inRank: Rank | 0): number { return 0; }
}
export default Joker;
