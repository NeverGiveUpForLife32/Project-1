/*----- constants -----*/
const COLORS = {

  '1': 'blue',
  '-1': 'orange',
}

/*----- state variables -----*/
let turn; //this will be 1 or -1
let board; // this will be a 2d array of 7 arrays with six values
let winner; // this will be set to null, 1, -1, or 'T'

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2')
const playAgainBtn = document.querySelector('button') 
const gameBoard = document.getElementById('board').parentNode
const gs = document.getElementById('board')
const fireworks = document.createElement('div')
fireworks.classList.add('fireworks')
gameBoard.insertBefore(fireworks, gs)
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
      render()
    }
    // this function transfers the state of our application to the DOM
    function render() {
      renderBoard();
      renderMessage();
      renderControls();
    }
    
    function renderBoard() {
      board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(rowVal, rowIdx) {
          const cellId = `c${colIdx}r${rowIdx}`
          const cellEl = document.getElementById(cellId);
          cellEl.style.backgroundColor = COLORS[rowVal]
        })
      });
    }
    
    function renderMessage() {
      if(winner === 'T') {
        messageEl.innerText = "It's a Tie!!!";
      } else if (winner) {
        messageEl.innerHTML = `<span style="color:${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`
      } else {
        messageEl.innerHTML = `<span style="color:${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s turn`
      }
    }
    
    function renderControls(){
      //the button & markers need to be rendered conditionally

  //button: hide while the game is in play
  //markers: hide when a column is occupied or there's a winner
      if(!winner) {
        playAgainBtn.style.visibility = 'hidden';
        fireworks.style.visibility = 'hidden';
        gs.style.visibility = 'visible';
      } else {
        playAgainBtn.style.visibility = 'visible';
        fireworks.style.visibility = 'visible';
        gs.style.display = 'none';

      }
    }