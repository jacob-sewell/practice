# Find Intersection

(from 2022-07-25 issue of cassidoo.email)

## Description

Given two arrays A and B, return the indices at which the two arrays intersect. If the two arrays have no intersection at all, return null.

### Extra credit

How would you change your code if they were linked lists instead of arrays, if the input were the two head nodes, and you returned the intersection node?

### Example

```js
let listA = [1,4,5,6]
let listB = [2,3,4,5,6]

findIntersection(listA, listB)
[1, 2]
```

([see this diagram](https://i.imgur.com/UyglRcN.png) if it helps you visualize it)

## Notes

I definitely needed the diagram to realize what is meant by intersection here. It's not just that the number 4 appears in position 1 of `listA` and position 2 of `listB`, it's that from that point on the arrays contain the same elements. That makes a lot of my knee-jerk questions (e.g. "What if listB had more than one 4?") irrelevant.

### What if it were a linked list?

Given how important it's going to be to work backward from the end of these arrays, I think if I were given linked lists I would turn them into arrays first and then do the same logic as I'm doing here. Obviously comparing values versus nodes would be an extra wrinkle, but it's still the same idea.
