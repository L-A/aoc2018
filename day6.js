const {Start, End} = require('./lib/performance')
const input = require('fs').readFileSync("./inputs/day6.txt").toString().split("\n")

// Helpers & input treatment

const locations = input.map((line, id) => {
  [_, x, y] = /(\d+), (\d+)/.exec(line).map(num => Number(num))
  return {id, x, y}
})

const manhattanDistance = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
const isBoundary = (x, y, width, height) => x == 0 || x >= width  || y == 0 || y >= height

const makeGrid = (locations) => {
  let gridWidth = Math.max.apply(Math, locations.map(function(l) { return l.x })) + 1
  let gridHeight = Math.max.apply(Math, locations.map(function(l) { return l.y })) + 1

  // We want a grid 1 unit larger than these dimensions, to create "boundary" cells.
  // These cells are infinity markers, and can flag the locations claiming them.

  let grid = [...Array(gridWidth + 1)].map(_ => [...Array(gridHeight + 1)].map(_ => ({
    bestProximity: 1000,
    bestId: undefined,
    isBoundary: false,
  })))

  grid.forEach((column, x) => {
    column.forEach((cell, y) => {
      locations.forEach((location) => {
        if (isBoundary(x, y, gridWidth, gridHeight)) {
          cell.isBoundary = true
        }
        let proximity = manhattanDistance(location, {x, y})
        // If closer than the last one, claim it and remember the distance
        if (proximity < cell.bestProximity) {
          cell.bestProximity = proximity
          cell.bestId = location.id
          // Equidistance makes the locations lose their claim
        } else if (proximity == cell.bestProximity) {
          cell.bestId = undefined
        }
      })
    })
  })
  return grid
}

// Part 1

const highestClaim = (grid) => {
  let locationScores = [...Array(locations.length)].map(_ => 0)
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (locationScores[cell.bestId] == undefined) return
      if (cell.isBoundary) {
        locationScores[cell.bestId] = undefined
      } else {
        locationScores[cell.bestId]++
      }
    })
  })
  return Math.max(...locationScores.filter(Boolean))
}

// Part 2

const safeZoneTally = (grid, limit, locations) => 
  grid.reduce((tally, column, x) =>
    tally + column.reduce((columnTally, _, y) =>
      columnTally + Number(locations.reduce((cellTotal, location) =>
        cellTotal + manhattanDistance(location, {x, y}), 0) < limit)
    , 0)
  , 0)

// Results

Start()
  const grid = makeGrid(locations)
  console.log("Highest claim count: " + highestClaim(grid))
  console.log("Safe zone tally :" + safeZoneTally(grid, 10000, locations))
End()
