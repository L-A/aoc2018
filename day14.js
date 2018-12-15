const {Start, End} = require('./lib/performance')
const input = "37"

// Helpers & input treatment
let scores = input.split('')

const cycle = (position, shift, length) => {
  while (shift < 0) {shift += length}
  return (position + shift) % length
}

const step = (scores, pos1, pos2) => {
  let recipeScore = Number(scores[pos1]) + Number(scores[pos2])
  let recipeDigits = recipeScore.toString().split('')
  while(recipeDigits.length) scores.push(recipeDigits.shift())
  let newPos1 = cycle(pos1, scores[pos1] * 1 + 1, scores.length)
  let newPos2 = cycle(pos2, scores[pos2] * 1 + 1, scores.length)

  return {scores: scores, pos1: newPos1, pos2: newPos2}
}

// Part 1

const scoreOfNextTen = (scores, maxRecipes) => {
  let firstElfIndex = 0
  let secondElfIndex = 1
  let _scores = scores.slice() 

  while (_scores.length < maxRecipes) {
    let newStep = step(_scores, firstElfIndex, secondElfIndex)
    firstElfIndex = newStep.pos1
    secondElfIndex = newStep.pos2
    _scores = newStep.scores
  }

  return _scores.join('').substring(_scores.length-10)
}

// Part 2 (~10s)

const findTargetOffset = (scores, target) => {
  let firstElfIndex = 0
  let secondElfIndex = 1
  let _scores = scores.slice()
  let targetPresent = false

  while (!targetPresent) {
    let newStep = step(_scores, firstElfIndex, secondElfIndex)
    firstElfIndex = newStep.pos1
    secondElfIndex = newStep.pos2
    _scores = newStep.scores
    if (_scores.slice(_scores.length - target.length - 1).join('').indexOf(target) != -1) {
      targetPresent = true
    }
  }
  return _scores.length - target.length - 1 + _scores.slice(_scores.length - target.length - 1).join('').indexOf(target)
}

// Results

Start()
  console.log("Score after 540391 recipes: " + scoreOfNextTen(scores, 540391 + 10))
  console.log("Recipes to the left of 540391: " + findTargetOffset(scores, "540391"))
End()
