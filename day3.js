const {Start, End} = require('./lib/performance')

const input = require('fs').readFileSync("./inputs/day3.txt").toString()

// Part 1

const calculateMatrix = (input) => {
  let matrix = []
  input.split("\n").forEach((line) => {
    [id, _, coords, size] = line.split(' ');
    [positionX, positionY] = coords.slice(0, -1).split(',').map(num => Number(num));
    [width, height] = size.split('x').map(num => Number(num));

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
  input.split("\n").forEach((line) => {
    [id, _, coords, size] = line.split(' ');
    [positionX, positionY] = coords.slice(0, -1).split(',').map(num => Number(num));
    [width, height] = size.split('x').map(num => Number(num));

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
const {overlappingSquares, matrix} = calculateMatrix(input) 
const nonOverlapping = findNonOverlapping(matrix, input)
console.log("Overlapping squares: " + overlappingSquares)
console.log("Lonely id: " + nonOverlapping)
End()
