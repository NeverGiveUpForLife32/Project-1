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
// document.body.appendChild(fireworks)
/*----- event listeners -----*/

/*----- functions -----*/
init();
function init() {
  turn = 1;
  board = [
    [0, 0, 0], //col 0
    [0, 0, 0], //col 1
    [0, 0, 0], //col 2

    //r0 r1 r2
  ];
  winner = null;
  render();
}
// this function transfers the state of our application to the DOM
function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function handleTurn(event) {
  event.target.innerHTML = turn == 1 ? "X" : "O";
  turn = turn == 1 ? -1 : 1;
  render();
}

function renderBoard() {
  board.forEach(function (colArr, colIdx) {
    colArr.forEach(function (rowVal, rowIdx) {
      const cellId = `c${colIdx}r${rowIdx}`;
      const cellEl = document.getElementById(cellId);
      cellEl.style.backgroundColor = COLORS[rowVal];
      cellEl.addEventListener("click", handleTurn);
    });
  });
}

function renderMessage() {
  if (winner === "T") {
    messageEl.innerText = "It's a Tie!!!";
    secMessageEl.innerHTML = null;
  } else if (winner) {
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

function restartGame() {
  init();
}

function renderControls() {
  if (winner == 1 || winner == -1) {
    setTimeout(() => {
      playAgainBtn.classList.remove("hidden");
      fireworks.classList.remove("hidden");

      gs.classList.add("hidden");
    }, 2000);
  } else if (winner == "T") {
    playAgainBtn.classList.add("hidden");
    fireworks.classList.remove("hidden");
  } else {
    playAgainBtn.classList.add("hidden");
    fireworks.classList.add("hidden");
    gs.classList.remove("hidden");
  }
}
