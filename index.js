const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');
const startBtn = document.querySelector('#startBtn');
const timerDisplay = document.querySelector('#timer');
const timeLeftDisplay = document.querySelector('#timeLeft');
const progressBar = document.querySelector('#progressBar');
const winnerMessage = document.querySelector('#winnerMessage');

let player = 'X';
let aiPlayer = 'O';
let isGameStart = false;
let timeLeft = 10;
let timer;
let boardState = Array(9).fill('');

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function removeBlinkFromCells() {
  cells.forEach(cell => cell.classList.remove('blink'));
}

function updateBlinkingCell() {
  removeBlinkFromCells();
  let availableCells = [];
  boardState.forEach((val, idx) => {
    if (val === '') availableCells.push(cells[idx]);
  });
  if (availableCells.length > 0) {
    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.classList.add('blink');
  }
}

function choosePlayer(selectedPlayer) {
  if (!isGameStart) {
    player = selectedPlayer;
    aiPlayer = player === 'X' ? 'O' : 'X';

    xPlayerDisplay.classList.toggle('player-active', player === 'X');
    oPlayerDisplay.classList.toggle('player-active', player === 'O');

    titleHeader.textContent = `You are ${player}`;

    const xPointer = document.getElementById("xPointer");
    if (xPointer) {
      xPointer.style.display = "none";
    }

    if (player === 'X') {
      xPlayerDisplay.classList.remove('blink');
      xPlayerDisplay.classList.add('heartbeat');
      startBtn.classList.add('blink');
    } else {
      xPlayerDisplay.classList.remove('heartbeat');
      startBtn.classList.remove('blink');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  choosePlayer('X');
});

startBtn.addEventListener('click', () => {
  if (!isGameStart) {
    startBtn.classList.remove('blink');

    isGameStart = true;
    startBtn.style.display = 'none';
    timerDisplay.style.display = 'block';
    startTimer();

    if (player === 'O') {
      setTimeout(aiMove, 500);
    } else {
      updateBlinkingCell();
    }
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('blink')) {
      cell.classList.remove('blink');
    }
    if (isGameStart && boardState[index] === '') {
      makeMove(index, player);
      if (!checkWinner()) setTimeout(aiMove, 500);
    }
  });
});

function aiMove() {
  let availableCells = boardState
    .map((val, idx) => (val === '' ? idx : null))
    .filter(v => v !== null);

  if (availableCells.length > 0) {
    let aiIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    if (cells[aiIndex].classList.contains('blink')) {
      cells[aiIndex].classList.remove('blink');
    }
    makeMove(aiIndex, aiPlayer);
    checkWinner();
    if (isGameStart && player === 'X') {
      updateBlinkingCell();
    }
  }
}

function makeMove(index, currentPlayer) {
  cells[index].textContent = currentPlayer;
  boardState[index] = currentPlayer;
  cells[index].style.color = currentPlayer === 'X' ? '#1892EA' : '#A737FF';

  player = currentPlayer === 'X' ? 'O' : 'X';
  resetTimer();
}

function startTimer() {
  timeLeft = 10;
  progressBar.max = timeLeft;
  progressBar.value = timeLeft;
  timeLeftDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    progressBar.value = timeLeft;

    if (timeLeft === 0) {
      aiMove();
      resetTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      declareWinner(boardState[a]);
      return true;
    }
  }
  if (!boardState.includes('')) {
    declareWinner('Draw');
    return true;
  }
  return false;
}

function declareWinner(winner) {
  clearInterval(timer);
  titleHeader.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins! 🎉`;
  winnerMessage.textContent = winner === 'Draw' ? "Match Drawn! 🤝" : `${winner} is the Champion! 🏆`;
  winnerMessage.style.display = 'block';
  restartBtn.style.display = 'block';
  isGameStart = false;

  timeLeft = 10;
  timeLeftDisplay.textContent = timeLeft;
  progressBar.value = timeLeft;
  timerDisplay.style.display = 'none';
}

restartBtn.addEventListener('click', () => {
  boardState.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('blink');
  });
  winnerMessage.style.display = 'none';
  restartBtn.style.display = 'none';
  startBtn.style.display = 'block';
  titleHeader.textContent = 'Choose Your Side';
  isGameStart = false;

  timeLeft = 10;
  timeLeftDisplay.textContent = timeLeft;
  progressBar.value = timeLeft;
  timerDisplay.style.display = 'none';
});
