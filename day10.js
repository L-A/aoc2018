const {Start, End} = require('./lib/performance')
const input = require('fs').readFileSync("./inputs/day10.txt").toString().split("\n")

// Helpers & input treatment
const particles = input.map(line => {
  let particleRegex = /< *([0-9\-]+), +([0-9\-]+).*< *([0-9\-]+), +([0-9\-]+)/
  let [_, x, y, vX, vY] = line.match(particleRegex).map(x => Number(x))
  return {x, y, vX, vY}
})

const step = (particleMap, backwards = false) => particleMap.map(particle => ({
  ...particle,
  x: particle.x + (backwards ? - particle.vX : particle.vX),
  y: particle.y + (backwards ? - particle.vY : particle.vY)
}))

const solve = particles => {
  let p = particles.slice()
  let lowestHeight = Infinity
  let currentHeight = 0
  let elapsed = 0

  while (lowestHeight > currentHeight) {
    elapsed++
    const previousP = p
    let highestY = -Infinity, lowestY = Infinity

    p = step(p)
    
    p.forEach(particle => {
      if (particle.y < lowestY) lowestY = particle.y
      if (particle.y > highestY) highestY = particle.y
    })

    if (highestY - lowestY < lowestHeight) {
      lowestHeight = highestY - lowestY 
    } else {
      elapsed--
      const finalParticles = previousP
      return {elapsed, finalParticles}
    }
  }
}

const print = (particles) => {
  const minX = Math.min(...particles.map(p => p.x))
  const width = Math.max(...particles.map(p => p.x)) - minX
  const minY = Math.min(...particles.map(p => p.y))
  const height = Math.max(...particles.map(p => p.y)) - minY
   
  particles = particles.map(particle => ({
    x: particle.x - minX,
    y: particle.y - minY
  }))

  let grid = [...Array(height + 1)].map(_ => ([...Array(width + 1)].map(_ => " ")))
  
  particles.forEach(particle => {
    grid[particle.y][particle.x] = "#"
  })

  grid.forEach(line => {
    console.log(line.join(''))
  })
}

// Results

Start()
const {elapsed, finalParticles} = solve(particles)
console.log("Elapsed time: " + elapsed)
console.log("Final print: ")
print(finalParticles)
End()
