// Elements
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const xStreakSpan = document.getElementById('xStreak');
const oStreakSpan = document.getElementById('oStreak');

const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const aiBtn = document.getElementById('aiBtn');
const modeSelection = document.getElementById('mode-selection');
const gameDiv = document.getElementById('game');
const scoresDiv = document.getElementById('scores');

// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let vsAI = false;
let streaks = { X: 0, O: 0 };

// Winning conditions
const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

// Mode selection
twoPlayerBtn.addEventListener('click', () => startGame(false));
aiBtn.addEventListener('click', () => startGame(true));

function startGame(aiMode) {
  vsAI = aiMode;
  modeSelection.style.display = 'none';
  gameDiv.style.display = 'grid';
  scoresDiv.style.display = 'flex';
  resetBtn.style.display = 'inline-block';
  resetGame();
}

// Cell click
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== '') return;

  makeMove(index, currentPlayer);

  // AI plays after X
  if (gameActive && vsAI && currentPlayer === 'O') {
    setTimeout(aiMove, 400);
  }
}

// Make a move
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add(player.toLowerCase());

  if (checkWinner(player)) return;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// AI move (random)
function aiMove() {
  const empty = board
    .map((v, i) => v === '' ? i : null)
    .filter(v => v !== null);

  if (!empty.length) return;

  const move = empty[Math.floor(Math.random() * empty.length)];
  makeMove(move, 'O');
}

// Winner check
function checkWinner(player) {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    if (board[a] === player &&
        board[b] === player &&
        board[c] === player) {

      gameActive = false;
      status.textContent = `Player ${player} wins! 🎉`;

      streaks[player]++;
      updateStreaks();

      [a, b, c].forEach(i =>
        cells[i].classList.add('win-cell')
      );

      return true;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    status.textContent = "It's a draw! 🤝";
    return true;
  }

  return false;
}

// Reset game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win-cell');
  });
}

// Update streaks
function updateStreaks() {
  xStreakSpan.textContent = streaks.X;
  oStreakSpan.textContent = streaks.O;
}

// Reset button
resetBtn.addEventListener('click', resetGame);

// Win animation style
const style = document.createElement('style');
style.innerHTML = `
  .win-cell {
    animation: winFlash 0.8s ease-in-out infinite alternate;
  }

  @keyframes winFlash {
    from { background-color: #fff; }
    to { background-color: #ffe066; }
  }
`;
document.head.appendChild(style);
