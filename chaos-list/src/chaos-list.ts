import { ChaosNode, ListLookupMap, ListMap } from './types';

export function chaosListToLookupMap(head: ChaosNode | null): ListLookupMap {
    let node: ChaosNode | null = head;
    const listLookupMap: ListLookupMap = new Map();
    while (node) {
        listLookupMap.set(node, listLookupMap.size);
        node = node.next;
    }
    return listLookupMap;
}

export function chaosListToListMap(head: ChaosNode | null): ListMap {
    let node: ChaosNode | null = head;
    const listLookupMap: ListMap = new Map();
    while (node) {
        listLookupMap.set(listLookupMap.size, node);
        node = node.next;
    }
    return listLookupMap;
}

function copyNodeValue(node: ChaosNode): ChaosNode['val'] {
    return JSON.parse(JSON.stringify(node.val));
}

export function deepCopyChaosList(inHead: ChaosNode | null): ChaosNode | null {
    if (inHead === null) return null;
    const lookupMap: ListLookupMap = chaosListToLookupMap(inHead);
    const outHead: ChaosNode = { val: copyNodeValue(inHead), next: null, rand: null };
    let inNode: ChaosNode | null = inHead;
    let outNode: ChaosNode | null = outHead;

    // Just the regular links to start
    while (inNode !== null && outNode !== null) {
        outNode.next = inNode.next === null ? null : { val: copyNodeValue(inNode), next: null, rand: null };
        outNode = outNode.next;
        inNode = inNode.next;
    }

    // Now the rand links
    const outMap = chaosListToListMap(outHead);
    lookupMap.forEach((idx: number, inNode: ChaosNode): void => {
        if (inNode.rand !== null && outMap.has(idx)) {
            const outNode: ChaosNode = outMap.get(idx) || { val: {}, next: null, rand: null };
            outNode.rand = outMap.get(lookupMap.get(inNode.rand) || 0) || { val: {}, next: null, rand: null };
        }
    });

    return outHead;
}

export function chaosListToString(head: ChaosNode | null): string {
    if (head === null) return 'null\n';
    let outStr = '';
    const listLookupMap = chaosListToLookupMap(head);
    listLookupMap.forEach((idx: number, node: ChaosNode): void => {
        const prefix = `${idx}: ${JSON.stringify(node.val)}`;
        outStr += `${prefix} -> ${node.next !== null ? listLookupMap.get(node.next) : 'null'}\n${prefix.replace(/./g, ' ')} -> ${node.rand ? listLookupMap.get(node.rand) : 'null'}\n`;
    });
    return outStr;
}

export default { chaosListToListMap, chaosListToLookupMap, deepCopyChaosList, chaosListToString };