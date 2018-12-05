const {Start, End} = require('./lib/performance')

const input = require('fs').readFileSync("./inputs/day4.txt").toString().split("\n").sort()

const getSleepStats = (schedule) => {
  let currentGuard
  let guards = {}

  // Compute all sleep schedules
  schedule.forEach(([time, event], index) => {
    if (event == "wakes") {
      let guardSchedule = guards[currentGuard].schedule
      for( minute = schedule[index-1][0]; minute < time; minute++) {
        guardSchedule[minute]++
      }
    } else if (event == "asleep") {
    } else { // guard change
      currentGuard = event.substr(1)
      if (!guards[currentGuard]) {
        guards[currentGuard] = {
          schedule: [...Array(60)].map((_) => 0)
        }
      } 
    }
  })

  let bestGuard = {id:0, sleepCount: 0, optimalMinute: 0}
  let bestMinute = {id:0, sleepCount: 0, optimalMinute: 0, optimalMinuteValue: 0} 

  for (id in guards) {
    let guard = guards[id]
    guard.sleepCount = guard.schedule.filter(minute => minute > 0).length + 1

    guard.optimalMinute = guard.schedule.reduce((bestMinute, minute, index) => minute > guard.schedule[bestMinute] ? index : bestMinute, 0)

    guard.optimalMinuteValue = guard.schedule.reduce((a, b) => Math.max(a,b))

    if (bestGuard.sleepCount <= guard.sleepCount) {
      bestGuard = {...guard, id: id}
    }

    if (bestMinute.optimalMinuteValue <= guard.optimalMinuteValue) {
      bestMinute = {...guard, id: id}
    }
  }
  return {bestGuard, bestMinute}
}

// Results
Start()

  const schedule = input.map((line) => {
    let [_, time, event] = line.match(/(\:\d+).*(#\d+|asleep|wakes)/)
    return [Number(time.substr(1)), event]
  })

  const {bestGuard, bestMinute} = getSleepStats(schedule)

  console.log("Sleepy guard ID * minute: " + bestGuard.id * bestGuard.optimalMinute)
  console.log("Highest minute guard ID * minute: " + bestMinute.id * bestMinute.optimalMinute)
End()
