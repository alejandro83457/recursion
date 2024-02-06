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
    if (xF < 0) return false;
    if (yF < 0) return false;

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

  board[x][y] = 2;
  queue.push([x, y]);
  let flag = true;
  while (flag) {
    let currentPos = queue.shift();
    allMoves.forEach((move) => {
      let nextPos = move(currentPos);
      if (nextPos) {
        if (JSON.stringify(nextPos) === JSON.stringify([xF, yF])) flag = false;
        queue.push(nextPos);
        board[nextPos[0]][nextPos[1]] = 1;
        positions.push({ currentPos, nextPos });
      }
    });
  }
  console.log(positions);
}

knightMoves([3, 3], [4, 3]);
printBoard();
