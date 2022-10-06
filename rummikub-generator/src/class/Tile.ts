import { Color, Rank } from '../types';
import TileInterface from './TileInterface';

abstract class Tile implements TileInterface {
    abstract get isWild(): boolean;
    abstract get rank(): Rank | 0;
    abstract get color(): Color | undefined;
    abstract get sortValue(): number;

    abstract toString(): string;
    abstract equals(t: TileInterface): boolean;
    sameColor(t: TileInterface): boolean {
        return (this.isWild && t instanceof Tile) || t.isWild || (this.color === t.color);
    }
    sameRank(t: TileInterface): boolean {
        return (this.isWild && t instanceof Tile) || t.isWild || (this.rank === t.rank);
    }
    abstract rankDiff(inRank: Rank | 0): number;
}
export default Tile;
