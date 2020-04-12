/**
 * Using a bijective base-26 system to represent strings
 * https://en.wikipedia.org/wiki/Bijective_numeration#The_bijective_base-26_system
 *
 * Represent letters using bijective base-26 system
 *
 * b-26 | b-10
 * -----------
 * A    | 1
 * B    | 2
 * C    | 3
 * ...
 * Z    | 26
 * AA   | 27
 * AB   | 28
 */

/**
 * Convert a base-26 bijective string value into its base-10 numeric value
 *
 * @param bijString A case insensitive string of [a-z]
 * @note Although this method is case insensitive, `toBijective` will always
 * return lowercase string rank values
 */
export function fromBijective(bijString: string): number {
  let base10 = 0
  for (let i = 0; i < bijString.length; i++) {
    // radix param of parseInt allows us to set the bijective base
    // when >10, values greater then 9 are represented by letters
    // eg.
    // 0 = 0
    // 1 = 1
    // ...
    // 9 = 9
    // 10 = a
    // 11 = b
    // ...
    // 35 = z
    const base26value = parseInt(bijString[bijString.length - (i + 1)], 36) - 9
    base10 += base26value * 26 ** i
  }

  return base10
}

/**
 * Convert an integer value into its base-26 bijective string representation
 *
 * @param base10value numeric integer value, >= 1
 */
export function toBijective(base10value: number): string {
  const accumulator =
    base10value > 26 ? toBijective(Math.floor((base10value - 1) / 26)) : ''

  // Number.toString also accepts a radix param
  // Will do the same as the radix in parseInt
  return accumulator + ((base10value % 26 || 26) + 9).toString(36)
}

export function betweenRanks(a: string, b: string): string {
  const [above, below] = a < b ? [a, b] : [b, a]

  const [aboveMajor, aboveMinor] = above.split(':')
  const [belowMajor, belowMinor] = below.split(':')

  const majorBase10 = {
    above: fromBijective(aboveMajor),
    below: fromBijective(belowMajor)
  }

  // check if there is distance in the first part
  if (majorBase10.below - majorBase10.above >= 2) {
    const base10rank = Math.floor((majorBase10.above + majorBase10.below) / 2)
    return `${toBijective(base10rank)}:`
  }

  const minorBase10 = {
    above: fromBijective(aboveMinor || 'a'),
    below: fromBijective(belowMinor || 'z')
  }

  // Check if there is distance in the second part
  if (minorBase10.below - minorBase10.above >= 2) {
    const base10rank = Math.floor((minorBase10.above + minorBase10.below) / 2)
    let rank = toBijective(base10rank)

    // Cannot insert between 'aaa:' and 'aaa:a', we need to ensure the minor
    // part never ends with 'a'
    if (rank[rank.length - 1] === 'a') {
      rank += 'i'
    }

    return `${aboveMajor}:${rank}`
  }

  return `${aboveMajor}:${aboveMinor}i`
}

/**
 * Increase (or decrease) rank by a given distance `n`
 *
 * @param rank a case insensitive string of [a-z]
 * @param n distance to add (or subtract) to `rank`
 */
export function increaseRank(rank: string, n: number): string {
  return toBijective(fromBijective(rank) + n)
}
