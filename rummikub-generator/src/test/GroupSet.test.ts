import GroupSet from '../class/GroupSet';
import Joker from '../class/Joker';
import RankedTile from '../class/RankedTile';
import { COLORS, RANKS, SET_TYPES } from '../constants';

describe('Test GroupSet performance', (): void => {
    const blackOne = new RankedTile(RANKS[0], COLORS.BLACK);
    const blackTwo = new RankedTile(RANKS[1], COLORS.BLACK);
    const redOne = new RankedTile(RANKS[0], COLORS.RED);
    const redTwo = new RankedTile(RANKS[1], COLORS.RED);
    const blueOne = new RankedTile(RANKS[0], COLORS.BLUE);
    const blueTwo = new RankedTile(RANKS[1], COLORS.BLUE);
    const yellowOne = new RankedTile(RANKS[0], COLORS.YELLOW);
    const yellowTwo = new RankedTile(RANKS[1], COLORS.YELLOW);
    const jokerOne = new Joker();
    const jokerTwo = new Joker();
    
    it('Reports the correct set type', (): void => {
        const group = new GroupSet();
        expect(group.type).toEqual(SET_TYPES.GROUP);
    });

    it('Collects tiles from the constructor', (): void => {
        const group = new GroupSet(blackOne, blackTwo, redOne, redTwo);
        expect(group.size).toEqual(4);
        expect(group.isFull).toBeTruthy();

        expect(group.tiles).toContain(blackOne);
        expect(group.tiles).toContain(blackTwo);
        expect(group.tiles).toContain(redOne);
        expect(group.tiles).toContain(redTwo);

        expect(group.tiles.toString()).toContain(blackOne.toString());
        expect(group.tiles.toString()).toContain(blackTwo.toString());
        expect(group.tiles.toString()).toContain(redOne.toString());
        expect(group.tiles.toString()).toContain(redTwo.toString());
    });

    it('Detects valid/scorable sets', (): void => {
        const groupOne = new GroupSet(blackOne, redOne);
        expect(groupOne.isValid).toBeTruthy();
        expect(groupOne.isScorable).toBeFalsy();
        groupOne.tiles = [...groupOne.tiles, blueOne];
        expect(groupOne.isValid).toBeTruthy();
        expect(groupOne.isScorable).toBeTruthy();
        groupOne.tiles = [...groupOne.tiles, yellowOne];
        expect(groupOne.isValid).toBeTruthy();
        expect(groupOne.isScorable).toBeTruthy();

        const groupTwo = new GroupSet(blackTwo, redTwo);
        expect(groupTwo.isValid).toBeTruthy();
        expect(groupTwo.isScorable).toBeFalsy();
        groupTwo.tiles = [...groupTwo.tiles, blueTwo];
        expect(groupTwo.isValid).toBeTruthy();
        expect(groupTwo.isScorable).toBeTruthy();
        groupTwo.tiles = [...groupTwo.tiles, yellowTwo];
        expect(groupTwo.isValid).toBeTruthy();
        expect(groupTwo.isScorable).toBeTruthy();

        const groupOneJ = new GroupSet(jokerOne, redOne);
        expect(groupOneJ.isScorable).toBeFalsy();
        expect(groupOneJ.isValid).toBeTruthy();
        groupOneJ.tiles = [...groupOneJ.tiles, blueOne];
        expect(groupOneJ.isValid).toBeTruthy();
        expect(groupOneJ.isScorable).toBeTruthy();
        groupOneJ.tiles = [...groupOneJ.tiles, jokerTwo];
        expect(groupOneJ.isValid).toBeTruthy();
        expect(groupOneJ.isScorable).toBeTruthy();
    });

    it('Detects invalid/nonscorable sets', (): void => {
        const groupOne = new GroupSet(blackOne, redOne, blueOne);
        expect(groupOne.isValid).toBeTruthy();
        groupOne.tiles = [...groupOne.tiles, blackTwo];
        expect(groupOne.isValid).toBeFalsy();

        const groupTwo = new GroupSet(jokerTwo, blackTwo, redTwo);
        expect(groupTwo.isValid).toBeTruthy();
        groupTwo.tiles = [...groupTwo.tiles, blueOne];
        expect(groupTwo.isValid).toBeFalsy();
    });

    it('Detects complete/full sets', (): void => {
        const groupOne = new GroupSet(blackOne, blackTwo, jokerOne);
        expect(groupOne.isComplete).toBeTruthy();
        expect(groupOne.isFull).toBeFalsy();
        groupOne.tiles = [...groupOne.tiles, jokerTwo];
        expect(groupOne.isComplete).toBeTruthy();
        expect(groupOne.isFull).toBeTruthy();
        groupOne.tiles = [...groupOne.tiles, blueOne];
        expect(groupOne.isComplete).toBeFalsy();
        expect(groupOne.isFull).toBeTruthy();
    });

    it('Ignores duplicate tile objects', (): void => {
        const groupOne = new GroupSet(blackOne, blackTwo);
        expect(groupOne.size).toEqual(2);
        groupOne.tiles = [...groupOne.tiles, blackOne];
        expect(groupOne.size).toEqual(2);
    });

    it('Allows duplicate tile values', (): void => {
        const groupOne = new GroupSet(blackOne, blackTwo);
        expect(groupOne.size).toEqual(2);
        groupOne.tiles = [...groupOne.tiles, new RankedTile(RANKS[0], COLORS.BLACK)];
        expect(groupOne.size).toEqual(3);
    });
});
