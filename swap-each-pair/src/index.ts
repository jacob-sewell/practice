export default function swapPairs(inList: unknown[]): unknown[] {
    const outList = [...inList];
    for (let i = 1; i < outList.length; i += 2) {
        const t: unknown = outList[i];
        outList[i] = outList[i - 1];
        outList[i - 1] = t;
    }
    return outList;
}
