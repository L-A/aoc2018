const {Start, End} = require('./lib/performance')
const input = require('fs').readFileSync("./inputs/day13.txt").toString().split('\n')

// Helpers & input treatment

let map = input

let north = {x: 0, y: -1}
let south = {x: 0, y: 1}
let east = {left: north, right: south, x: 1, y: 0}
let west = {left: south, right: north, x: -1, y: 0}
north.left = west
north.right = east
south.left = east
south.right = west


const Cart = (x, y, direction) => {
  let newCart = {
    x: x,
    y: y,
    direction: direction,
    turnCount: 0
  }
  newCart.cycle
  return newCart
}

let carts = []

map.forEach((line, y) => {
  line.split('').forEach((coord, x) => {
    let direction = false
    if (coord == '>') direction = east
    else if (coord == '<') direction = west
    else if (coord == '^') direction = north
    else if (coord == 'v') direction = south
    if (direction) carts.push(Cart(x, y, direction))
    if (direction == north || direction == south) {
      map[y] = map[y].substring(0, x) + "|" + map[y].substring(x + 1)
    }
    else if (direction == east || direction == west) {
      map[y] = map[y].substring(0, x) + "-" + map[y].substring(x + 1)
    }
  })
})

const xSort = (a,b) => a.x > b.x
const ySort = (a,b) => a.y > b.y

// Part 1

const tick = (map, carts) => {
  let _carts = carts.map(a => Object.assign({}, a))
  let collision = false
  _carts.sort(ySort).sort(xSort).forEach((cart, cartIndex) => {
    cart.x += cart.direction.x
    cart.y += cart.direction.y

    for (let j = 0; j < _carts.length; j++) {
      if (cartIndex == j) continue
      let cartB = _carts[j]
      if (cart.x == cartB.x && cart.y == cartB.y) {
        console.log("Collision at " + cart.x + ", " + cart.y)
        if (!collision) collision = {x: cart.x, y: cart.y}
        console.log(_carts.map(x => x.x + ", " + x.y))
        if (cartIndex < j) {
          _carts.splice(j, 1)
          _carts.splice(cartIndex, 1)
        } else {
          _carts.splice(cartIndex, 1)
          _carts.splice(j, 1)
        }
      }
    }

    const newTile = map[cart.y][cart.x]
    if (newTile == "/") {
      if (cart.direction == north) cart.direction = east
      else if (cart.direction == east) cart.direction = north
      else if (cart.direction == south) cart.direction = west
      else if (cart.direction == west) cart.direction = south
    }
    else if (newTile == "\\") {
      if (cart.direction == north) cart.direction = west
      else if (cart.direction == east) cart.direction = south
      else if (cart.direction == south) cart.direction = east
      else if (cart.direction == west) cart.direction = north
    }
    else if (newTile == "+") {
      if (cart.turnCount % 3 == 0) {
        cart.direction = cart.direction.left
      }
      else if (cart.turnCount % 3 == 2) {cart.direction = cart.direction.right}
      cart.turnCount++
    }
  })
  return {carts: _carts, collision: collision}
}

const solveForCollision = (map, carts) => {
  let collision = false
  let _carts = carts.map(a => Object.assign({}, a))
  while (!collision) {
    let results = tick(map, _carts)
    _carts = results.carts
    collision = results.collision
  }
  return collision
}

// Part 2

const solveForLastCart = (map, carts) => {
  let _carts = carts.map(a => Object.assign({}, a))
  while (_carts.length > 1) {
    let results = tick(map, _carts)
    _carts = results.carts
    if (_carts.length == 1) {
      return {x: _carts[0].x, y: _carts[0].y} 
    }
  }
}

// Results

Start()
  let partOne = solveForCollision(map, carts)
  console.log("First crash at: " + partOne.x + ", " + partOne.y)

  let partTwo = solveForLastCart(map, carts)
  console.log("Last cart begins at: " + partTwo.x + ", " + partTwo.y)
End()
