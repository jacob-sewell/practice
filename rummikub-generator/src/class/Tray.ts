import { Color, Rank } from '../types';
import { TRAY_STARTING_SIZE, NUM_RANKED_DUPLICATES, NUM_JOKERS, RANKS, COLORS } from '../constants';
import Tile from './Tile';
import RankedTile from './RankedTile';
import Joker from './Joker';
import TileSet from './TileSet';
import RunSet from './RunSet';
import GroupSet from './GroupSet';

class Tray {
    static STARTING_SIZE = TRAY_STARTING_SIZE;
    static RANKED_DUPLICATES = NUM_RANKED_DUPLICATES;
    static JOKERS = NUM_JOKERS;
    #tiles: Tile[];
    #sets: TileSet[];

    constructor(startingSize: number = Tray.STARTING_SIZE) {
        this.#tiles = [];
        this.#sets = [];
        
        if (startingSize > 0) {
            // Create the universe of available tiles, randomly ordered
            const jokers: Tile[] = [];
            while (jokers.length < Tray.JOKERS) {
                // Start with the appropriate number of jokers
                jokers.push(new Joker());
            }
            const allTiles = RANKS.reduce(
                (ret: Tile[], rank: Rank): Tile[] => {
                    for (const color in COLORS) {
                        for (let i = 0; i < Tray.RANKED_DUPLICATES; i++) {
                            const insertPos = Math.floor(Math.random() * ret.length);
                            ret.push(...ret.splice(insertPos, 1, new RankedTile(rank, color)));
                        }
                    }
                    return ret;
                },
                jokers
            );

            // Draw startingSize tiles from the shuffled available tiles
            this.#tiles.push(...allTiles.slice(0, startingSize));

            // Sort tiles
            this.sortTiles();
        }
    }

    get tiles(): Tile[] { return [...this.#tiles]; }
    set tiles(inTiles: Tile[]) {
        this.#sets = [];
        this.#tiles = [...inTiles];
        this.sortTiles();
    }

    sortTiles(sortDir: 'DESC' | 'ASC' = 'DESC'): void {
        const sortFactor: 1 | -1 = sortDir === 'ASC' ? 1 : -1;
        this.#tiles.sort((a: Tile, b: Tile) => sortFactor * (a.sortValue - b.sortValue));
    }
    
    findSets(): TileSet[] {
        // TODO: This method should ideally not return sets that are subsets of other scorable sets.
        const [ jokers, ranked ]: Tile[][] = this.#tiles.reduce(
            (ret: Tile[][], t: Tile) => {
                ret[t.isWild ? 0 : 1].push(t);
                return ret;
            }, [[], []]
        );

        // Build all RunSets
        const runSets: Map<string, RunSet> = new Map();
        const tilesByColor: Map<Color, Map<Rank | 0, Tile>> = ranked.reduce(
            (ret: Map<Color, Map<Rank | 0, Tile>>, t: Tile): Map<Color, Map<Rank | 0, Tile>> => {
                if (t.color) {
                    if (ret.has(t.color)) {
                        ret.get(t.color)?.set(t.rank, t);
                    } else {
                        ret.set(t.color, new Map());
                        ret.get(t.color)?.set(t.rank, t);
                    }
                }
                return ret;
            },
            new Map()
        );
        // All valid combinations of just the ranked tiles
        tilesByColor.forEach((tiles: Map<Rank | 0, Tile>): void => {
            const colorSets: Map<string, RunSet> = new Map();
            tiles.forEach((t: Tile): void => {
                [...colorSets.values()].forEach((rs: RunSet): void => {
                    if (rs.isFull) return;
                    const newSet = new RunSet(t, ...rs.tiles);
                    if (newSet.isValid && !colorSets.has(newSet.toString())) {
                        colorSets.set(newSet.toString(), newSet);
                    }
                });
                const newSet = new RunSet(t);
                if (!colorSets.has(newSet.toString())) {
                    colorSets.set(newSet.toString(), newSet);
                }
            });
            // console.table(colorSets.map((s) => s.toString()));
            colorSets.forEach((rs: RunSet, key: string) => runSets.set(key, rs));
        });
        // Add jokers where possible
        const runSetsWithJokers: RunSet[] = [...runSets.values()].reduce(
            (newSets: RunSet[], rs: RunSet): RunSet[] => {
                jokers.forEach((joker: Tile): void => {
                    if (!rs.isFull) newSets.push(new RunSet(joker, ...rs.tiles));
                });
                return newSets;
            },
            []
        );

        // Build all GroupSets
        const tilesByRank: Map<Rank | 0, Map<Color, Tile>> = new Map();
        ranked.forEach((t: Tile): void => {
            if (t.color) {
                if (!tilesByRank.has(t.rank)) {
                    tilesByRank.set(t.rank, new Map());
                }
                tilesByRank.get(t.rank)?.set(t.color, t);
            }
        });
        // All possible combinations within a rank
        const groupSets: Map<string, GroupSet> = new Map();
        tilesByRank.forEach((rankTilesByColor: Map<Color, Tile>): void => {
            const rankSets: Map<string, GroupSet> = new Map();
            rankTilesByColor.forEach((t: Tile): void => {
                [...rankSets.values()].forEach((gs: GroupSet): void => {
                    if (gs.isFull) return;
                    const newSet: GroupSet = new GroupSet(t, ...gs.tiles);
                    if (!rankSets.has(newSet.toString())) {
                        rankSets.set(newSet.toString(), newSet);
                    }
                });
                const newSet: GroupSet = new GroupSet(t);
                rankSets.set(newSet.toString(), newSet);
                rankSets.forEach((gs: GroupSet, key: string): void => { groupSets.set(key, gs); });
            });
        });
        // Add jokers where possible
        const groupSetsWithJokers: GroupSet[] = [...groupSets.values()].reduce(
            (newSets: GroupSet[], gs: GroupSet): GroupSet[] => {
                jokers.forEach((joker: Tile): void => {
                    if (!gs.isFull) newSets.push(new GroupSet(joker, ...gs.tiles));
                });
                return newSets;
            },
            []
        );

        // return only scorable sets
        this.#sets = [...runSets.values(), ...runSetsWithJokers, ...groupSets.values(), ...groupSetsWithJokers].filter((ts: TileSet): boolean => ts.isScorable);
        return this.#sets;   
    }
}
export default Tray;
