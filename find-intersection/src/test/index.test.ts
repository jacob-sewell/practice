import findIntersection from '.';
import type { arrayIntersection } from './types';

describe('Test findIntersection with various arrays', (): void => {
    it('Detects the intersection of integer arrays that do intersect', (): void => {
        const intTail: number[] = new Array(10)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10));
        const intHeadA: number[] = new Array(10)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10));
        const intHeadB: number[] = new Array(5)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10));

        // Just make sure we don't randomly intersect early
        if (intHeadA[9] === intHeadB[4]) intHeadA[9]++;

        expect(
            findIntersection(
                [...intHeadA, ...intTail],
                [...intHeadB, ...intTail]
            )
        ).toEqual([intHeadA.length, intHeadB.length]);
        expect(
            findIntersection(
                [...intHeadB, ...intTail],
                [...intHeadA, ...intTail]
            )
        ).toEqual([intHeadB.length, intHeadA.length]);
    });

    it('Detects the intersection of character arrays that do intersect', (): void => {
        const codeForA: number = 'A'.charCodeAt(0);
        const codeForZ: number = 'Z'.charCodeAt(0);
        const minCode: number = Math.min(codeForA, codeForZ);
        const codeDiff: number = Math.abs(codeForA - codeForZ);
        const charTail: string[] = new Array(10)
            .fill('')
            .map(() =>
                String.fromCharCode(
                    minCode + Math.floor(Math.random() * codeDiff)
                )
            );
        const charHeadA: string[] = new Array(10)
            .fill('')
            .map(() =>
                String.fromCharCode(
                    minCode + Math.floor(Math.random() * codeDiff)
                )
            );
        const charHeadB: string[] = new Array(5)
            .fill('')
            .map(() =>
                String.fromCharCode(
                    minCode + Math.floor(Math.random() * codeDiff)
                )
            );

        // Just make sure we don't randomly intersect early
        charHeadA.push('A');
        charHeadB.push('B');

        expect(
            findIntersection(
                [...charHeadA, ...charTail],
                [...charHeadB, ...charTail]
            )
        ).toEqual([charHeadA.length, charHeadB.length]);
        expect(
            findIntersection(
                [...charHeadB, ...charTail],
                [...charHeadA, ...charTail]
            )
        ).toEqual([charHeadB.length, charHeadA.length]);
    });

    it('Detects the intersection of object arrays that do intersect', (): void => {
        const objTail: object[] = new Array(10).fill({}).map(() => ({}));
        const objHeadA: object[] = new Array(10).fill({});
        const objHeadB: object[] = new Array(5).fill({});

        expect(
            findIntersection(
                [...objHeadA, ...objTail],
                [...objHeadB, ...objTail]
            )
        ).toEqual([objHeadA.length, objHeadB.length]);
        expect(
            findIntersection(
                [...objHeadB, ...objTail],
                [...objHeadA, ...objTail]
            )
        ).toEqual([objHeadB.length, objHeadA.length]);
    });

    it('Detects the disjointness of integer arrays that do not intersect', (): void => {
        const intHeadA: number[] = new Array(10)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10));
        const intHeadB: number[] = new Array(5)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10));

        // Just make sure we don't randomly intersect early
        if (intHeadA[9] === intHeadB[4]) intHeadA[9]++;

        expect(findIntersection(intHeadA, intHeadB)).toEqual(null);
        expect(findIntersection(intHeadB, intHeadA)).toEqual(null);
    });

    it('Detects the disjointness of character arrays that do not intersect', (): void => {
        const codeForA: number = 'A'.charCodeAt(0);
        const codeForZ: number = 'Z'.charCodeAt(0);
        const minCode: number = Math.min(codeForA, codeForZ);
        const codeDiff: number = Math.abs(codeForA - codeForZ);
        const charHeadA: string[] = new Array(10)
            .fill('')
            .map(() =>
                String.fromCharCode(
                    minCode + Math.floor(Math.random() * codeDiff)
                )
            );
        const charHeadB: string[] = new Array(5)
            .fill('')
            .map(() =>
                String.fromCharCode(
                    minCode + Math.floor(Math.random() * codeDiff)
                )
            );

        // Just make sure we don't randomly intersect early
        charHeadA.push('A');
        charHeadB.push('B');

        expect(findIntersection(charHeadA, charHeadB)).toEqual(null);
        expect(findIntersection(charHeadB, charHeadA)).toEqual(null);
    });

    it('Detects the disjointness of object arrays that do not intersect', (): void => {
        const objHeadA: object[] = new Array(10).fill({});
        const objHeadB: object[] = new Array(5).fill({});

        expect(findIntersection(objHeadA, objHeadB)).toEqual(null);
        expect(findIntersection(objHeadB, objHeadA)).toEqual(null);
    });
});
