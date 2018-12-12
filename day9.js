const {Start, End} = require('./lib/performance')

// Helpers
const cycle = (position, shift, length) => {
  while (shift < 0) {shift += length}
  return (position + shift) % length
}

// "Game" loop
const playGame = (playersCount, marbles) => {
  let currentPlayer = 0
  let currentMarble = {value: 0}
  currentMarble.next = currentMarble
  currentMarble.prev = currentMarble
  let playerScores = [...Array(playersCount)].map(_ => 0)

  for (turn = 1; turn <= marbles; turn++) {
    let isScoringRound = turn % 23 == 0
    
    if (isScoringRound) {
      currentMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev // lol
      playerScores[currentPlayer] += turn + currentMarble.value
      currentMarble.next.prev = currentMarble.prev
      currentMarble.prev.next = currentMarble.next
      currentMarble = currentMarble.next
    }
    else {
      let nextMarble = {
        value: turn,
        next: currentMarble.next.next,
        prev: currentMarble.next
      }
      currentMarble.next.next.prev = nextMarble
      currentMarble.next.next = nextMarble
      currentMarble = nextMarble
    }

    currentPlayer = cycle(currentPlayer, 1, playersCount)
  }
  return {playerScores, currentMarble}
}

Start()
  console.log("Part 1 game: " + Math.max(...playGame(455, 71223).playerScores))
  console.log("Part 2 game: " + Math.max(...playGame(455, 71223 * 100).playerScores))
End()
