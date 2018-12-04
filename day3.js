const {Start, End} = require('./lib/performance')

const input = require('fs').readFileSync("./inputs/day3.txt").toString().split("\n")

// Part 1

const calculateMatrix = (input) => {
  let matrix = []
  input.forEach(([_, positionX, positionY, width, height]) => {
    for (y = positionY; y < positionY + height; y++) {
      for (x = positionX; x < positionX + width; x++) {
        if (!matrix[y]) { matrix[y] = [] }
        if (!matrix[y][x]) { matrix[y][x] = 1 }
        else { matrix[y][x] += 1 }
      }
    } 
  })

  let overlappingSquares = 0
  matrix.forEach((row) => {
    row.forEach((square) => {
      if (square > 1) { overlappingSquares ++ }
    })
  })

  return {overlappingSquares, matrix}
}

// Part 2

const findNonOverlapping = (matrix, input) => {
  let lonelyId = undefined
  input.forEach(([id, positionX, positionY, width, height]) => {
    let claimedOnce = true

    for (y = positionY; y < positionY + height; y++) {
      for (x = positionX; x < positionX + width; x++) {
        if ( matrix[y][x] > 1) { claimedOnce = false }
      }
    }
    if (claimedOnce) {lonelyId = id} 
  })
  return lonelyId
}

// Results
Start()

const instructions = input.map((line) => {
  [_, id, positionX, positionY, width, height] = line
    .match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
    .map((num) => Number(num))
  return [id, positionX, positionY, width, height]
})

const {overlappingSquares, matrix} = calculateMatrix(instructions) 
const nonOverlapping = findNonOverlapping(matrix, instructions)
console.log("Overlapping squares: " + overlappingSquares)
console.log("Lonely id: " + nonOverlapping)
End()
