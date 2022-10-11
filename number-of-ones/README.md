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

Just first thoughts, but I think this is going to come down to powers of ten. Like, how many times does each wheel of the metaphorical odometer spin around between `0` and `n`.

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
