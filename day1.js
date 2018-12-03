const {Start, End} = require('./lib/performance')

Start()
const input = require('fs').readFileSync("./inputs/day1.txt").toString()
const steps = input.split(/\n/)

let frequency = 0
let log = [0]
let final = undefined
let matched = undefined

while (matched == null) {
  steps.forEach(step => {
    frequency = eval(frequency + step)
    if (!matched) {
      if (log.indexOf(frequency) == -1) {
        log.push(frequency)
      } else {
        matched = frequency
      }
    }
  });
  if (final == undefined) {final = frequency}
}

console.log("Final frequency: " + final)
console.log("First match: " + matched)
End()
