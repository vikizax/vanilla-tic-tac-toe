const winningCondition: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

const gameState = {
    currentPlayer: 1,
    totalTurnsPlayed: 0,
    winner: 0,
}

const gameSqaures = document.querySelectorAll('.game-square') as NodeListOf<HTMLButtonElement>;
const gameHeading = document.getElementById('game-heading') as HTMLHeadingElement;
const restartBtn = document.getElementById('restart-button') as HTMLButtonElement;

function handleGameTurn(this: HTMLButtonElement) {

    this.innerText = gameState.currentPlayer === 1 ? 'X' : 'O'
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1

    this.disabled = true
    gameState['totalTurnsPlayed'] += 1

    if (gameState.totalTurnsPlayed >= 5)
        gameState.winner = getWinner()

    updatePlayerTurnHeading()

}

function updatePlayerTurnHeading() {

    if (gameState.winner > 0 && gameState.winner < 4) {
        gameHeading.innerText = gameState.winner === 3 ? 'Tie Game!' : `Player ${gameState.winner} Won!`
        return resetGameUI()
    }

    let player = "Player 1"
    if (gameState.currentPlayer === 2)
        player = "Player 2"

    gameHeading.innerText = `${player}'s Turn`
}

// returns: 1 -> player 1 win, 2 -> player 2 win, 3 -> draw, 4 -> continue game
function getWinner() {
    for (let col = 0; col < winningCondition.length; col++) {

        const isPlayer1 = winningCondition[col].every(pos => {
            return gameSqaures[pos].innerText === 'X'
        })

        const isPlayer2 = winningCondition[col].every(pos => {
            return gameSqaures[pos].innerText === 'O'
        })

        if (isPlayer1)
            return 1

        if (isPlayer2)
            return 2
    }
    if (gameState.totalTurnsPlayed === 9) return 3
    return 4
}

function handleResetBtnAction(e: Event) {
    gameSqaures.forEach(sq => {
        sq.innerText = ''
        sq.disabled = false
    });
    gameState.currentPlayer = 1;
    gameState.totalTurnsPlayed = 0;
    gameState.winner = 0;
    gameHeading.innerText = "Player 1's Turn";
    (e.target as HTMLButtonElement).style.display = 'none';
}

function resetGameUI() {
    restartBtn.style.display = 'block';

    gameSqaures.forEach(sq => {
        sq.disabled = true
    })

    restartBtn.addEventListener('click', handleResetBtnAction)
}

function initateGame() {
    gameSqaures.forEach(sq => {
        sq.addEventListener('click', handleGameTurn)
    })
}

initateGame();
