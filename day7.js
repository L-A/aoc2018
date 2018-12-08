const {Start, End} = require('./lib/performance')
const input = require('fs').readFileSync("./inputs/day7.txt").toString().split("\n")

// Helpers & input treatment

const requirements = input.map((line) => {
  [_, blocker, step] = /Step ([A-Z]).*step ([A-Z])/.exec(line)
  return {step, blocker}
})

const startStep = (stepName, steps, stepBaseTime) => {
  steps[stepName] = {
    ...steps[stepName],
    hasWorker: true,
    timer: stepTime(stepName) + stepBaseTime
  }
  return steps
}

const completeStep = (stepName, steps) => {
  for (step in steps) {
    steps[step].blockers = steps[step].blockers.filter(x => x!== stepName)
  }
  steps[stepName].hasWorker = false
  return steps
}

const stepTime = (stepName) => stepName.charCodeAt(0) - 64

const tick = (steps) => {
  for (step in steps) {
    if (steps[step].timer) { steps[step].timer-- }
  } 
}

// Step 1

const solvePath = (requirements, workers = 5, stepBaseTime = 60) => {
  let steps = {}, solution = [], time = 0

  // Consolidate steps, store dependencies
  requirements.forEach(({step, blocker}) => {
    steps[step] = steps[step] || {blockers: [], timer: 0, hasWorker: false}
    steps[blocker] = steps[blocker] || {blockers: [], timer: 0, hasWorker: false}
    steps[step].blockers.push(blocker)
  })

  // Main loop
  while (solution.length < Object.keys(steps).length) {

    // Figure out if a step has just been completed
    // Mark it done and "free" its worker
    Object.keys(steps)
    .filter(x => steps[x].hasWorker && !steps[x].timer)
    .forEach(step => {
      workers++
      steps = completeStep(step, steps)
      solution.push(step)
    }) 

    // Find any next step that's without blockers and not already running
    let nextSteps = Object.keys(steps)
    .filter(x => steps[x].blockers.length == 0).sort()
    .filter(x => !solution.includes(x) && !steps[x].hasWorker)

    // If there are workers, start the next available (& alphabetical) step
    while (nextSteps.length > 0 && workers) {
      let stepName = nextSteps.shift()
      workers--
      steps = startStep(stepName, steps, stepBaseTime)
    }

    tick(steps)
    time++
  }
  time--
  return {solution, time}
}

// Results

Start()
  // For part 1, use 1 worker instead of 5
  const {solution, time} = solvePath(requirements, 5, 60)
  console.log("Solution: " + solution.join(''))
  console.log("Time: " + time)
End()
