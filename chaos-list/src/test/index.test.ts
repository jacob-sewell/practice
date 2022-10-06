import { chaosListToListMap, chaosListToLookupMap, deepCopyChaosList, chaosListToString } from '../chaos-list';
import { ChaosNode, ListMap } from '../types';

const getDummyList = (): [ListMap, ChaosNode] => {
    const listNodes: ChaosNode[] = new Array(20).fill(null).map(() => ({ val: {}, next: null, rand: null }));
    let head: ChaosNode | null = null;
    
    // Create the regular links
    listNodes.forEach((node: ChaosNode, idx: number): void => {
        const prev: ChaosNode | null = listNodes[idx - 1] || null;
        if (prev) {
            prev.next = node;
        } else {
            head = node;
        }
    });
    const listMap: ListMap = chaosListToListMap(head);

    // Create the rand links -- rather than random I'm going to be mean, and have half of them null while the other half form a loop
    listMap.forEach((node: ChaosNode, idx: number): void => {
        // node.next = listMap.get(idx + 1) || null;
        if (idx % 2 === 0) { // Even number -> set rand to the next even numbered node
            const nextEven: ChaosNode | undefined = listMap.get((idx + 2) % listMap.size);
            if (nextEven) {
                node.rand = nextEven;
            }
        }
        // Odd numbered nodes have rand left at null
    });

    return [listMap, head !== null ? head : { val: {}, next: null, rand: null }];
};

describe('Test copying a chaos list', (): void => {
    // First create the list
    const [listMap, listHead] = getDummyList();
    // console.log(chaosListToString(listHead));
    const copiedListHead = deepCopyChaosList(listHead);
    const copiedListMap = chaosListToListMap(copiedListHead);

    it('returns a list of the same size', (): void => {
        expect(copiedListMap.size).toEqual(listMap.size);
    });

    it('returns a list with the same shape and values', (): void => {
        expect(chaosListToString(listHead)).toEqual(chaosListToString(copiedListHead));
    });

    it('deep copies the nodes', (): void => {
        copiedListMap.forEach((copiedNode: ChaosNode, idx: number): void => {
            const sourceNode: ChaosNode = listMap.get(idx) || copiedNode;
            expect(copiedNode === sourceNode).toBeFalsy();
        });
    });

    it('deep copies the values', (): void => {
        copiedListMap.forEach((copiedNode: ChaosNode, idx: number): void => {
            const sourceNode: ChaosNode = listMap.get(idx) || copiedNode;
            expect(copiedNode.val === sourceNode.val).toBeFalsy();
        });
    });
});