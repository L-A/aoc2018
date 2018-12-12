const {Start, End} = require('./lib/performance')

// Helpers & input treatment

const cellPowerLevel = (x, y, s) => {
  let power = (((x + 10) * y + s) * (x + 10)).toString()
  power = power.substring(power.length - 3, power.length - 2)
  return power == "" ? -5 : power-5
}

const addSquare = (grid, x, y, size = 3) => {
  let total = 0
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      total += grid[x + i][y + j]
    }
  }
  return total
}

const bestCellCoords = (s, anySize) => {
  let bestCoordinates = {x: 0, y: 0, size: 3}
  let bestScore = 0
  let maxSize = anySize ? 299 : 3

  const localCellPowerLevel = (x, y) => cellPowerLevel(x, y, s)

  let grid = [...Array(301)].map((_, x) =>
    ([...Array(301)].map((_, y) =>
      localCellPowerLevel(x, y)
    ))
  )

  for(let size = 3; size <= maxSize; size++) {
    console.log("Trying size " + size)
    for(let i = 1; i <= 300 - size; i++) {
      for (let j = 1; j <= 300 - size; j++) {
        let localScore = addSquare(grid, i, j, size)
        if (localScore > bestScore) {
          console.log("New best score! " + localScore)
          console.log("At " + i + ", " + j)
          bestScore = localScore
          bestCoordinates = {x: i,  y: j, size: size}
        }
      }
    }
  }
  
  return bestCoordinates
}

// Results

Start()
console.log(bestCellCoords(5535))
console.log(bestCellCoords(5535, true))
End()
