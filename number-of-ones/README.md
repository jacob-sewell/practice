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
