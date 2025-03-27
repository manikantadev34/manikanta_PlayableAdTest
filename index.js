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

// Utility: Remove blinking effect from all cells
function removeBlinkFromCells() {
  cells.forEach(cell => cell.classList.remove('blink'));
}

// Utility: Choose a random empty cell and add blink effect
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

// Choose player and control blinking for start button
function choosePlayer(selectedPlayer) {
  if (!isGameStart) {
    player = selectedPlayer;
    aiPlayer = player === 'X' ? 'O' : 'X';

    xPlayerDisplay.classList.toggle('player-active', player === 'X');
    oPlayerDisplay.classList.toggle('player-active', player === 'O');

    titleHeader.textContent = `You are ${player}`;

    // Hide pointer if exists
    const xPointer = document.getElementById("xPointer");
    if (xPointer) {
      xPointer.style.display = "none";
    }

    // When X is chosen, remove any blink on it and start blinking the start button
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

// Auto-select X on page load (if desired)
document.addEventListener('DOMContentLoaded', () => {
  choosePlayer('X');
});

// Start game: stop start button blink, hide it, start timer, and blink one cell
startBtn.addEventListener('click', () => {
  if (!isGameStart) {
    // Stop start button blinking
    startBtn.classList.remove('blink');

    isGameStart = true;
    startBtn.style.display = 'none';
    timerDisplay.style.display = 'block';
    startTimer();

    // If player chose O, let AI move first; otherwise, update blinking cell for player's turn.
    if (player === 'O') {
      setTimeout(aiMove, 500);
    } else {
      updateBlinkingCell();
    }
  }
});

// Player move: remove blink if clicked and proceed with move
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('blink')) {
      cell.classList.remove('blink');
    }
    if (isGameStart && boardState[index] === '') {
      makeMove(index, player);
      // After player's move, if game continues, AI moves
      if (!checkWinner()) setTimeout(aiMove, 500);
    }
  });
});

// AI move: if blinking cell is chosen by AI, remove blink; then, if player's turn resumes, update blinking cell.
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
    // If game is still active and it's now the player's turn (X), update blinking cell.
    if (isGameStart && player === 'X') {
      updateBlinkingCell();
    }
  }
}

// Make move: update board and toggle turn
function makeMove(index, currentPlayer) {
  cells[index].textContent = currentPlayer;
  boardState[index] = currentPlayer;
  cells[index].style.color = currentPlayer === 'X' ? '#1892EA' : '#A737FF';

  // Toggle turn: if current player is X, then turn becomes O, and vice versa.
  player = currentPlayer === 'X' ? 'O' : 'X';
  resetTimer();
}

// Timer function with progress bar
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

// Reset timer
function resetTimer() {
  clearInterval(timer);
  startTimer();
}

// Check winner condition
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

// Declare winner and end game
function declareWinner(winner) {
  clearInterval(timer);
  titleHeader.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins! 🎉`;
  winnerMessage.textContent = winner === 'Draw' ? "Match Drawn! 🤝" : `${winner} is the Champion! 🏆`;
  winnerMessage.style.display = 'block';
  restartBtn.style.display = 'block';
  isGameStart = false;

  // Reset timer UI after game ends
  timeLeft = 10;
  timeLeftDisplay.textContent = timeLeft;
  progressBar.value = timeLeft;
  timerDisplay.style.display = 'none';
}

// Restart game: reset board and UI
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

  // Reset timer UI
  timeLeft = 10;
  timeLeftDisplay.textContent = timeLeft;
  progressBar.value = timeLeft;
  timerDisplay.style.display = 'none';
});
