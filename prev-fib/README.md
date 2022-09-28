# Previous Fibonacci Number
(Taken from cassidoo.email from 2022-06-19)

# Description
Given a Fibonacci number, give the previous Fibonacci number. If there is no previous Fibonacci number, either because the number given is not a Fibonacci number or because the number given was 0, return -1.

## Examples

```js
console.log(prevFib(BigInt(0))); // -1
console.log(prevFib(BigInt(1))); // 0 -- You could make a case that 1 is also correct, but let's keep it simple.
console.log(prevFib(BigInt(5))); // 3
console.log(prevFib(BigInt(317811))); // 196418
console.log(prevFib(BigInt(317812))); // -1
console.log(prevFib(BigInt(-2))); // -1
```
