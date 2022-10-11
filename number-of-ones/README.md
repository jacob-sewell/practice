# Number of Ones

(from the 2022-07-31 issue of cassidoo.email)

## Description

Given an integer `n`, count the total number of `1` digits appearing in all non-negative integers less than or equal to `n`.

### Example

```js
> numberOfOnes(14)
> 7 // 1, 10, 11, 12, 13, 14
```

## Notes

### Algorithm and Approach

I probably did more brute forcing on this than was necessary, but I'm a coder; I like to write code. I started with the observation that it's possible to recursively determine this for any number that's 1 less than a power of ten, like so:

| exp | 10^exp - 1 | expression | calculated number of ones, or f(exp) |
| --- | ---------- | ---------- | ------------------------------------ |
| 1 | 9 | 1 | 1 |
| 2 | 99 | 10^1 + 10 * f(1) | 20 |
| 3 | 999 | 10^2 + 10 * f(2) | 300 |
| 4 | 9999 | 10^3 + 10 * f(3) | 4000 |
| 5 | 99999 | 10^4 + 10 * f(4) | 50000 |
| 6 | 999999 | 10^5 + 10 * f(5) | 600000 |

So the general function for a positive integer `n` that happens to be one less than 10 to the power `exp` is:

```js
function f(exp) {
    if (exp <= 1) return 1;
    return Math.pow(10, exp - 1) // The number of times the digit in the most significant place was 1.
        + 10 * f(exp - 1); // We had to go through the next-smaller power of ten ten times to get here.
}
```

This was the origin of `numberOfOnesBelowExp()` in index.ts. Everything after that about dealing with the incomplete journey to the next power of ten, e.g. how many times have we turned over the next less significant place, have we gone through all the times when the most significant place had a 1, etc.

### Benchmarking power-of-ten detection

In the course of writing my tests it became useful to know whether detecting powers of 10 via `Math.log10()` was more or less performant than doing it by comparing the number's string representation to `/^10*$/`. So I benchmarked it using this code:

```js
// benchmark log10 based digit detection against string-based digit detection
for (let pow = 2; pow < 10; pow++) {
    const floor = Math.pow(10, pow - 2);
    const ceil = Math.pow(10, pow);
    let powTensFound = 0;
    let startTime = Date.now();

    // log10 based digit detection
    for (let n = floor; n < ceil; n++) {
        const log10 = Math.log10(n);
        if (Math.floor(log10) == log10) powTensFound++;
    }
    console.log(
        `[${floor}...${ceil}]: Math.log10() based power of ten detection:`,
        { powTensFound, elapsedTime: Date.now() - startTime }
    );

    powTensFound = 0;
    startTime = Date.now();

    // regex based digit detection
    for (let n = floor; n < ceil; n++) {
        if (n.toString(10).match(/^10*$/)) powTensFound++;
    }
    console.log(
        `[${floor}...${ceil}]: Regex based power of ten detection:`,
        {
            powTensFound,
            elapsedTime: Date.now() - startTime,
        }
    );
}
```

What I learned is that it starts out close, but `Math.log10()` loses ground rapidly to the regex method for larger numbers. Here is some sample output:

```js
[1...100]: Math.log10() based power of ten detection: { powTensFound: 2, elapsedTime: 0 }
[1...100]: Regex based power of ten detection: { powTensFound: 2, elapsedTime: 0 }
[10...1000]: Math.log10() based power of ten detection: { powTensFound: 2, elapsedTime: 1 }
[10...1000]: Regex based power of ten detection: { powTensFound: 2, elapsedTime: 0 }
[100...10000]: Math.log10() based power of ten detection: { powTensFound: 2, elapsedTime: 4 }
[100...10000]: Regex based power of ten detection: { powTensFound: 2, elapsedTime: 1 }
...
[1000000...100000000]: Math.log10() based power of ten detection: { powTensFound: 2, elapsedTime: 33851 }
[1000000...100000000]: Regex based power of ten detection: { powTensFound: 2, elapsedTime: 7541 }
[10000000...1000000000]: Math.log10() based power of ten detection: { powTensFound: 2, elapsedTime: 342870 }
[10000000...1000000000]: Regex based power of ten detection: { powTensFound: 2, elapsedTime: 75020 }
```
