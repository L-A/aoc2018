const {Start, End} = require('./lib/performance')
const polymer = require('fs').readFileSync("./inputs/day5.txt").toString()

// Part 1

const removeDuo = (chain, position) => chain.substring(0, position) + chain.substring(position+2, chain.length)
const isOppositeCase = (a, b) => a.toLowerCase() == b.toLowerCase() && a !== b

const reactChain = (chain) => {
  let position = 0
  while (position < chain.length - 1) {
    if (isOppositeCase(chain.charAt(position), chain.charAt(position+1))) {
      chain = removeDuo(chain, position)
      position -= 1
    } else {
      position += 1
    }
    if (position < 0) position = 0
  }
  return chain
}

// Part 2

const findShortestChainAlteration = (chain) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
  let bestComponent, bestLength = chain.length
  
  alphabet.forEach((component) => {
    let toRemove = new RegExp('([' + component + component.toUpperCase() + '])', 'gi')
    const alteredChain = reactChain(chain.replace(toRemove, ''))
    if (alteredChain.length < bestLength) {
      bestComponent = component
      bestLength = alteredChain.length
    } 
  })
  return {bestComponent, bestLength}
}

// Results
Start()
let {bestComponent, bestLength} = findShortestChainAlteration(polymer) 
console.log("Reacted chain length: " + reactChain(polymer).length)
console.log("Shortest chain by removing " + bestComponent + ", getting length " + bestLength)
End()
