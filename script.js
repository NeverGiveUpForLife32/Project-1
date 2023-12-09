/*----- constants -----*/
const COLORS = {
  1: "blue",
  "-1": "orange",
};

/*----- state variables -----*/
let turn; //this will be 1 or -1
let board; // this will be a 2d array of 7 arrays with six values
let winner; // this will be set to null, 1, -1, or 'T'

/*----- cached elements  -----*/
const messageEl = document.querySelector("h2");
const secMessageEl = document.querySelector("h3");
const playAgainBtn = document.querySelector("button");
const gameBoard = document.getElementById("board").parentNode;
const gs = document.getElementById("board");
const fireworks = document.createElement("div");
fireworks.classList.add("fireworks");
gameBoard.insertBefore(fireworks, gs);
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//if the first 3 strings are not spaces and are all the same, then there's a win
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

/*----- event listeners -----*/
//DON'T INVOKE CALLBACK AS IN init()!!! THIS DOESN'T PASS THE CALLBACK!!! WHAT IT DOES IS IT PASS WHAT THE INIT() RETURN WHICH IS NOTHING. YOU JUST WANT TO PASS A REFERENCE TO THE FUNCTION SO THAT IT CAN BE CALLED BACK TO AT A LATER TIME.
playAgainBtn.addEventListener("click", init);

/*----- functions -----*/
init();
function init() {
  turn = 1;
  board = [
    [0, 0, 0], //r0
    [0, 0, 0], //r1
    [0, 0, 0], //r2
    //c0 c1 c2
  ];
  gs.childNodes.forEach((cell) => (cell.innerHTML = ""));

  winner = null;
  running = true;
  render();
}

function handleTurn(event) {
  const turnPos = `${event.target.id.replace("c", "")}`.split("r");

  if (board[turnPos[1]][turnPos[0]] == 0) {
    board[turnPos[1]][turnPos[0]] = turn;

    currentPlayer = turn == 1 ? "X" : "O";

    event.target.innerHTML = currentPlayer;
    event.target.style.color = COLORS[turn];

    //Within the checkWinner function and within the winConditions of the combinations, return every chosen postion,
    //
    function checkWinner() {
      return winConditions.some((combination) => {
        return combination.every((index) => {
          return board.flat()[index] == turn;
        });
      });
    }

    // toggle the turn: Use turn == 1 ? -1 : 1; or turn *= = -1;
    //Within the checkWinner function, if the winner is one of the players, stop running.
    //Within the cbeckTie function, if its a tie game, stop running.
    //Else toggle players turn
    if (checkWinner()) {
      winner = turn;
      running = false;
    } else if (checkTie()) {
      winner = "T";
      running = false;
    } else {
      turn *= -1;
    }
    render();
  }
}

//The array flat method creates a new array with all of the sub arrays elements
//concatonated (linked) to it.
//
function checkTie() {
  return board.flat().every((item) => item != 0);
}
// this function transfers the state of our application to the DOM
function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderBoard() {
  board.forEach(function (colArr, colIdx) {
    colArr.forEach(function (rowVal, rowIdx) {
      const cellId = `c${colIdx}r${rowIdx}`;
      const cellEl = document.getElementById(cellId);
      //Make click event for the moves made on the board
      cellEl.addEventListener("click", handleTurn, { once: true });
    });
  });
}

function renderMessage() {
  if (winner === "T") {
    messageEl.innerText = "It's a Tie!!!";
    secMessageEl.innerHTML = null;
  } else if (winner == 1 || winner == -1) {
    messageEl.innerHTML = `<span style="color:${COLORS[winner]}">${COLORS[
      winner
    ].toUpperCase()}</span> Wins!`;
    secMessageEl.innerHTML = `<span style="color:${COLORS[winner]}">${COLORS[
      winner
    ].toUpperCase()}</span> CONGRATULATIONS YYYEEEEAAAA BUDDY!!!`;
  } else {
    messageEl.innerHTML = `<span style="color:${COLORS[turn]}">${COLORS[
      turn
    ].toUpperCase()}</span>'s turn`;
    secMessageEl.innerHTML = `<h3>GOOD LUCK!!!</h3>`;
  }
}

function renderControls() {
  if (winner == 1 || winner == -1) {
    setTimeout(() => {
      //originally playAgainBtn.style.visibility = visible
      //originally fireworks.style.visibility = visible
      //originally gs.style.display = none
      playAgainBtn.classList.remove("hidden");
      fireworks.classList.remove("hidden");
      gs.classList.add("hidden");
    }, 2000);
  } else if (winner == "T") {
    setTimeout(() => {
      //originally playAgainBtn.style.visibility = visible
      //originally fireworks.style.visibility = visible
      //originally gs.style.display = none
      playAgainBtn.classList.remove("hidden");
      fireworks.classList.remove("hidden");
      gs.classList.add("hidden");
    }, 2000);
  } else {
    //originally playAgainBtn.style.visibility = hidden
    //originally fireworks.style.visibility = hidden
    //originally gs.style.visibility = visible
    playAgainBtn.classList.add("hidden");
    fireworks.classList.add("hidden");
    gs.classList.remove("hidden");
  }
}
