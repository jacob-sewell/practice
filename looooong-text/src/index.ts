export function longText( inStr: string, factor: number ): string {
    return inStr.replace(/[aeiou]/ig, (match: string): string => match.repeat(factor));
}
