const {Start, End} = require('./lib/performance')
const input = require('fs').readFileSync("./inputs/day8.txt").toString()

// Helpers & input treatment
const tree = input.split(" ").map(x => Number(x))

// Parse first headers then recurse errything

// For a node:
const parseNode = (input, position, metadataScore = 0) => {

  let childNodeScores = []
  let nodeScore = 0
  // Count number of children and metadata
  let childrenCount = input[position]
  let metadataCount = input[position + 1]
  position += 2

  // Get a metadata and cursor offset from parsing children
  while(childrenCount > 0) {
    let result = parseNode(input, position, metadataScore)
    position = result.position
    metadataScore = result.metadataScore
    childNodeScores.push(result.nodeScore)
    childrenCount--
  }
  
  // Add its own metadata score
  while(metadataCount > 0) {
    metadataScore += input[position]

    // If there are children, node score is based on them
    if (childNodeScores.length && childNodeScores[input[position] - 1]) {
      nodeScore += childNodeScores[input[position] - 1]
    }

    // If there are no children, the score is metadata itself
    else if (childNodeScores.length == 0) {
      nodeScore += input[position]
    }
    
    position++
    metadataCount--
  }
  
  // Return with the cursor offset
  return {position, metadataScore, nodeScore}
}

// Results

Start()
  let {_, metadataScore, nodeScore} = parseNode(tree, 0)
  console.log("Metadata score:" + metadataScore)
  console.log("First node score: " + nodeScore)
End()
