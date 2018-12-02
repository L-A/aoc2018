const input = require('fs').readFileSync("./inputs/day2.txt").toString()
const boxes = input.split(/\n/).map((box) => box.split(""))

// Part 1

const hasAmountOfCharacters = (box, amount) => {
  let _box = box.slice()
  let matches
  while(matches != amount && _box.length >= 1) {
    matches = 1
    let character = _box.pop()
    while (_box.lastIndexOf(character) != -1) {
      matches++
      _box.splice(_box.lastIndexOf(character), 1)
    }
  }
  return matches == amount
}

const boxesMatchingAmount = (list, amount) => list.reduce(
  (matches, box) => matches + (hasAmountOfCharacters(box, amount) ? 1 : 0), 0
)

// Part 2

const findSimilarBoxCharacters = (list) => {
  let result = ""
  boxes.forEach(box => {
    if (result != "") return
    list.forEach((comparedBox) => {
      let matchedCharacters = box.slice()
      let misses = 0
      for (char in box) {
        if (box[char] != comparedBox[char]) {
          misses++
          matchedCharacters.splice(char, 1)
        }
      }
      if (misses == 1) { result = matchedCharacters }
    })
  })
  return result
}

// Results

const checksum = boxesMatchingAmount(boxes, 2) * boxesMatchingAmount(boxes, 3)
const matchingCharacters = findSimilarBoxCharacters(boxes).join("")

console.log("Checksum: " + checksum)
console.log("Matching characters: " + matchingCharacters)
