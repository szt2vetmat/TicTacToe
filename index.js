const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const cells = Array.from(document.querySelectorAll(".cell"));

let currentPlayer = "X";
let gameOver = false;

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = "green";
            cells[b].style.backgroundColor = "green";
            cells[c].style.backgroundColor = "green";
            return cells[a].textContent;
        }
    }

    if (cells.every(cell => cell.textContent !== "")) {
        return "Tie";
    }

    return null;
}

function handleCellClick(event) {
    if (gameOver || event.target.textContent !== "") {
        return;
    }

    event.target.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;

    const winner = checkWin();
    if (winner) {
        gameOver = true;
        if (winner === "Tie") {
            status.textContent = "It's a Tie!";
        } else {
            status.textContent = `Player ${winner} Wins!`;
        }
    }
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "";
    });

    currentPlayer = "X";
    gameOver = false;
    status.textContent = "Player X's Turn";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetBoard);

resetBoard();
