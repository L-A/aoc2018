const {Start, End} = require('./lib/performance')
const input = require('fs').readFileSync("./inputs/day12.txt").toString().split('\n')

// Helpers & input treatment

const initialState = input[0]
const rules = input.slice(2).map(line => line.split(' => ')).filter(x => x[1] != ".")

// Part 1

const tick = (initialState, rules) => {
  initialState = "..." + initialState + "..."
  let solution = initialState.slice()
  let offset = -3
  for (let i = 3; i <= initialState.length - 2; i++) {
    if (rules.find(x => x[0] == initialState.substring(i-3, i+2))) {
      solution = solution.substring(0, i - 1) + "#" + solution.substring(i)
    } else {
      solution = solution.substring(0, i - 1) + "." + solution.substring(i) 
    }
  }

  while (solution.indexOf('.') == 0) {
    solution = solution.substring(1)
    offset++
  }

  while (solution.lastIndexOf('.') == solution.length - 1) {
    solution = solution.substring(0,solution.length - 1)
  }

  return {solution, offset}
}

const resolve = (state, rules, steps, offset = 0) => {
  let solution = state.slice()
  for (let i = 0; i < steps; i++) {
    let result = tick(solution, rules)
    solution = result.solution
    offset += result.offset
  }

  let score = 0
  solution.split('').forEach((potValue, potPosition) => {
    score += potValue == "#" ? potPosition + offset : 0
  })

  return {solution, score, offset}
}

// Part 2
// Hypothesis: Like most Game of Life types, it stabilizes after a while
// So: Hunt for a linear progression then extrapolate

const resolveLongTerm = (initialState, rules, steps) => {
  let offset = 0
  let previousDelta = -2, currentDelta = -1
  let stepsTaken = 0
  let state = initialState.slice()
  let score = 0
  while (previousDelta != currentDelta) {
    stepsTaken += 1000
    let newStep = resolve(state, rules, 1000, offset)
    offset = newStep.offset
    state = newStep.solution
    previousDelta = currentDelta
    currentDelta = newStep.score - score
    score = newStep.score
  }

  return currentDelta * (steps - stepsTaken) / 1000 + score
}

// Results

Start()
  console.log("Part 1: " + resolve(initialState, rules, 20).score)
  console.log("Part 2: " + resolveLongTerm(initialState, rules, 50000000000))
End()
