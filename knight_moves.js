const LOW = 0;
const HIGH = 7;

function printBoard() {
  board.forEach((row) => console.log(row.join(' ')));
}

// higher-order function returns a function with
// specified x and y directions
function move(moveX, moveY) {
  return ([x, y]) => {
    let xF = x + moveX;
    let yF = y + moveY;
    if (xF < 0) return false;
    if (yF < 0) return false;
    // console.log('From', x, y, 'To', xF, yF);
    board[xF][yF]++;
    return true;
  };
}

const moveUpLeft = move(-2, -1);
const moveUpRight = move(-2, 1);
const moveLeftUp = move(-1, -2);
const moveLeftDown = move(1, -2);
const moveDownLeft = move(2, -1);
const moveDownRight = move(2, 1);
const moveRightUp = move(-1, 2);
const moveRightDown = move(1, 2);

let board = Array(8);
for (let i = 0; i < board.length; i++) {
  board[i] = Array(8).fill(0);
}

// printBoard();
console.log(moveUpLeft([4, 3]));
console.log(moveUpRight([4, 3]));
console.log(moveRightUp([4, 3]));
console.log(moveRightDown([4, 3]));
console.log(moveDownLeft([4, 3]));
console.log(moveDownRight([4, 3]));
console.log(moveLeftDown([4, 3]));
console.log(moveLeftUp([4, 3]));
printBoard();
