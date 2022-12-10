/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [2,4,6],[0,4,8]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.getElementsByClassName('sqr')
const messageEl = document.getElementById('message')
const gameBoard = document.querySelector('.board')
const resetBtn = document.querySelector("#reset")

/*----------------------------- Event Listeners -----------------------------*/

gameBoard.addEventListener('click', handleClick)
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

function init(){
  turn = 1
  winner = false
  tie = false
  board = []
  for(let i = 0; i < 9; i++){
    board[i] = null
  }
  render()
}

function render(){
  updateBoard()
  updateMessage()
}

function updateBoard(){
  for(let i = 0; i < 9; i++){
    if(board[i] === null){ 
      squareEls[i].innerHTML = null
    } else if (board[i] === 1){ 
      squareEls[i].textContent = "X" 
    } else if(board[i] === -1){ 
      squareEls[i].textContent = "0"
    }
  }
}

function updateMessage(){
  if(!winner && !tie){
    if(turn === 1){
      messageEl.textContent = "It is X's turn"
    } else {
      messageEl.textContent = "It is O's turn"
    }
  } else if(!winner && tie){
    messageEl.textContent = "The match was a tie"
  } else {
    if(turn === 1){
      messageEl.textContent = "Player X has won!"
			confetti.start(1500)
    } else {
      messageEl.textContent = "Player O has won!"
			confetti.start(1500)
    }
  }
}

function handleClick(evt){
  const sqIdx = evt.target.id.slice(2)
  if(board[sqIdx] !== null){
    return
  } else if (winner === true){
    return
  }
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx){
  board[idx] = turn
}

function checkForTie(){
  for(let i = 0; i < 9; i++){
    if (board[i] === null){
      return tie = false
    } else {
      tie = true
    }
  }
}

function checkForWinner(){
  for(let i = 0; i < winningCombos.length; i++){ 
    if(Math.abs(
      board[winningCombos[i][0]]+
      board[winningCombos[i][1]]+
      board[winningCombos[i][2]]
      ) 
      === 3) {
        return winner = true
    }
  }
}

function switchPlayerTurn(){
  if(winner === true){
    return
  } else if(winner === false){
    turn = turn * -1
  }
}

/*-------------------------------- Program Flow --------------------------------*/
init()


