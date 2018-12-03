let startTime = 0

const Start = () => {
  console.log("[Starting]")
  startTime = process.hrtime()
}

const End = () => {
  console.log("[Done] Completed in " + process.hrtime(startTime) + "s")
}

module.exports = {Start, End}
