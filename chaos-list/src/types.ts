export type ChaosNode = {
    val: object;
    next: ChaosNode | null;
    rand: ChaosNode | null;
};
export type ListLookupMap = Map<ChaosNode, number>;
export type ListMap = Map<number, ChaosNode>;
