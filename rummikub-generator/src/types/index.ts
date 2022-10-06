import { WILD, COLORS, RANKS, SET_TYPES } from '../constants';
export type Wild = typeof WILD;
export type Rank = typeof RANKS[number];
export type Color = typeof COLORS.BLACK | typeof COLORS.RED | typeof COLORS.YELLOW | typeof COLORS.BLUE;
export type SetType = typeof SET_TYPES.GROUP | typeof SET_TYPES.RUN;
