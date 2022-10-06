# Rummikub Random Fun Times

(Taken from 2022-07-04 cassidoo.email)

## Description

The game Rummikub has 106 tiles: 8 sets numbered 1-13, colored red, blue, black, and yellow, and two (2) “wildcard” tiles.

Write two functions: one that creates a new player’s tray of 14 tiles (repetitions allowed), and one that returns the valid sets from a given tray. A set can be either 3 or 4 tiles of the same number (but all different colors), or it can be a “run” (which is three or more consecutive numbers all in the same color). The rules for Rummikub are [here](https://rummikub.com/rules/) if you need more clarification!

## Notes

I overengineered the hell out of this one. Mostly I was having fun messing around with OOP stuff in Typescript. Some things are definitely redundant, like using both an interface and an abstract class for tiles. And some of the logic probably belongs in different places than it is, like Tray.findSets probably knows too much about the different kinds of sets that exist and what their rules are. Probably that logic belongs in static methods on the set classes themselves.

Right now the Tray.findSets() returns all scorable sets in a tray, including those that are trivial subsets of others (e.g. three of a kind when you also have four of a kind, or a run from 1 to 3 when you also have 4). I suppose it's debateable, but I think it shouldn't do that. If I come back to this later on, that's something I might want to change.
