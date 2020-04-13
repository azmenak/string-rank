# String Rank

Provides utility methods needed to use a string value as a "rank" in a database.

Inspired by [this Stack Overflow answer](https://stackoverflow.com/questions/9536262/best-representation-of-an-ordered-list-in-a-database). Here we expose two simple methods which should allow use of string ranks.

1. `increaseRank(rank: string, by: number): string`
<br />Which can be used to fill existing rows in a database by simply iterating and increasing each value by a given ammount.
2. `moveBetween(rankA: string, rankB: string): string`
<br />Which simply returns a new rank string at the halfway distance between the two provided values. This allow us to simply update a single record in a database to arbitrarily rank rows.
