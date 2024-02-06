let board = Array(8);
for (let i = 0; i < board.length; i++) {
  board[i] = Array(8).fill(0);
}

// prints 'board'
function printBoard() {
  board.forEach((row) => {
    console.log(row.join('   '));
    console.log();
  });
}

// higher-order function returns a function with
// specified x and y directions
function move(moveX, moveY) {
  return ([x, y]) => {
    let xF = x + moveX;
    let yF = y + moveY;

    // check if coords are invalid
    if (xF < 0 || xF > 7) return false;
    if (yF < 0 || yF > 7) return false;

    // check if spot has been discovered
    if (board[xF][yF] > 0 || board[xF][yF] == -1) return false;

    // console.log('From', x, y, 'To', xF, yF);
    // board[xF][yF]++;
    return [xF, yF];
  };
}

// all knight moves
const moveUpLeft = move(-2, -1);
const moveUpRight = move(-2, 1);
const moveLeftUp = move(-1, -2);
const moveLeftDown = move(1, -2);
const moveDownLeft = move(2, -1);
const moveDownRight = move(2, 1);
const moveRightUp = move(-1, 2);
const moveRightDown = move(1, 2);

// makes it easier to call all moves
let allMoves = [
  moveUpLeft,
  moveUpRight,
  moveLeftUp,
  moveLeftDown,
  moveDownLeft,
  moveDownRight,
  moveRightUp,
  moveRightDown,
];

function knightMoves([x, y], [xF, yF]) {
  let queue = [];
  let positions = [];
  let path = [];

  // mark the start
  board[x][y] = 2;
  // add the start pos to queue
  queue.push([x, y]);

  let flag = true;
  while (flag) {
    let currentPos = queue.shift(); // pop the el from queue
    // try all 8 moves
    for (let move of allMoves) {
      let nextPos = move(currentPos);
      // check if move was valid
      if (nextPos) {
        queue.push(nextPos); // add it to queue
        board[nextPos[0]][nextPos[1]] = 1; // mark pos as discovered
        positions.push([currentPos, nextPos]); // log move
        // check if move is the destination
        if (JSON.stringify(nextPos) === JSON.stringify([xF, yF])) {
          flag = false;
          break;
        }
      }
    }
  }
  // console.log(positions);

  flag = true;
  // push the destination pos
  path.push(positions[positions.length - 1][1]);
  while (flag) {
    for (let set of positions) {
      // if we found the next step backwards
      if (JSON.stringify(set[1]) === JSON.stringify(path[0])) {
        path.unshift(set[0]);
        continue;
      }
      // if we found the very first pos
      if (JSON.stringify(path[0]) === JSON.stringify([x, y])) {
        flag = false;
        break;
      }
    }
  }

  // print path
  path.forEach((step) => console.log(step));
}

knightMoves([4, 5], [1, 1]);
// printBoard();
