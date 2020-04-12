import {betweenRanks, fromBijective, increaseRank, toBijective} from '.'

describe('increaseRank', () => {
  it('increases the rank of a string by a small numeric value', () => {
    const rank = 'aaa'
    const result = increaseRank(rank, 10)

    expect(result).toBe('aak')
  })

  it('increases the rank of a different string by a small numeric value', () => {
    const rank = 'aaz'
    const result = increaseRank(rank, 10)

    expect(result).toBe('abj')
  })

  it('increases the rank of a string by a medium numeric value', () => {
    const rank = 'aaa'
    const result = increaseRank(rank, 36)

    expect(result).toBe('abk') // 26 + 10
  })

  it('increases the rank of a string by a large numeric value', () => {
    const rank = 'aaa'
    const result = increaseRank(rank, 686) // 26^2 + 10

    expect(result).toBe('bak')
  })

  it('increments any valid value string rank', () => {
    let rank = 'aaa'

    rank = increaseRank(rank, 20)
    expect(rank).toBe('aau')

    rank = increaseRank(rank, 20)
    expect(rank).toBe('abo')

    rank = increaseRank(rank, 20)
    expect(rank).toBe('aci')

    rank = increaseRank(rank, 676)
    expect(rank).toBe('bci')

    rank = increaseRank(rank, 26)
    expect(rank).toBe('bdi')

    rank = increaseRank(rank, 17_576) // 26^3
    expect(rank).toBe('abdi')
  })
})

describe('toBijective', () => {
  it('returns bijctive representtion of a base 10 number', () => {
    expect(toBijective(1)).toBe('a')
    expect(toBijective(703)).toBe('aaa')
    expect(toBijective(729)).toBe('aba')
    expect(toBijective(739)).toBe('abk')
  })
})

describe('fromBijective', () => {
  it('returns base number for a bijective string of letters', () => {
    expect(fromBijective('aaa')).toBe(703)
    expect(fromBijective('aba')).toBe(729)
    expect(fromBijective('abk')).toBe(739)
  })
})

describe('betweenRanks', () => {
  it('returns a new rank, between two ordered ranks', () => {
    expect(betweenRanks('aaaaaa:', 'aaaaab:')).toBe('aaaaaa:m')
    expect(betweenRanks('aaaaaa:', 'aaaaac:')).toBe('aaaaab:')
    expect(betweenRanks('aaaaaa:a', 'aaaaab:b')).toBe('aaaaaa:ai')
  })
})
