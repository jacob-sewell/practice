import { Rank, Color } from '../types';
interface TileInterface {
    get isWild(): boolean;
    get rank(): Rank | 0;
    get color(): Color | undefined;
    get sortValue(): number;

    toString(): string;
    equals(t: TileInterface): boolean;
    sameColor(t: TileInterface): boolean;
    sameRank(t: TileInterface): boolean;
    rankDiff(inRank: Rank | 0): number;
}
export default TileInterface;
