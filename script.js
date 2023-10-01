const grid = document.querySelector('.grid')
const card = document.querySelector('.info-tab')
const twoPlayerButton = document.getElementById("two-player-mode");
const computerButton = document.getElementById("computer-mode");
const gameSheet = []
let playerOne = "X"
let playerTwo = "O"
let currentPlayer = playerOne
const dimensions = 20
let isComputerTurn = false;
let twoPlayersMode = false;
const resetButton = document.getElementById("reset");
let gameOver = false;

// Function to store and retrieve player names, games played, and games won for a specific game session based on player names
function storeAndRetrieveGameSession(player1Name, player2Name) {
    // Retrieve existing game sessions from local storage (if any)
    let gameSessions = JSON.parse(localStorage.getItem("gameSessions")) || [];

    // Search for a game session that matches the provided player names
    const selectedGameSession = gameSessions.find(session => {
        return (
            (session.player1Name === player1Name && session.player2Name === player2Name) ||
            (session.player1Name === player2Name && session.player2Name === player1Name)
        );
    });

    if (selectedGameSession) {
        // Display player names, games played, and games won from the selected game session
        document.querySelector(".player_one_name").textContent = selectedGameSession.player1Name || "Player 1";
        document.querySelector(".player_two_name").textContent = selectedGameSession.player2Name || "Player 2";
        document.querySelector(".player_one_games").textContent = selectedGameSession.player1GamesPlayed || "0";
        document.querySelector(".player_two_games").textContent = selectedGameSession.player2GamesPlayed || "0";
        document.querySelector(".player_one_won").textContent = selectedGameSession.player1GamesWon || "0";
        document.querySelector(".player_two_won").textContent = selectedGameSession.player2GamesWon || "0";
    } else {
        // Create a new game session with the provided player names and initialize games played and games won
        const newGameSession = {
            player1Name,
            player2Name,
            player1GamesPlayed: 0,
            player2GamesPlayed: 0,
            player1GamesWon: 0,
            player2GamesWon: 0
        };

        // Add the new game session to the array
        gameSessions.push(newGameSession);

        // Store the updated array of game sessions in local storage
        localStorage.setItem("gameSessions", JSON.stringify(gameSessions));

        // Display player names, initially with 0 games played and 0 games won
        document.querySelector(".player_one_name").textContent = newGameSession.player1Name || "Player 1";
        document.querySelector(".player_two_name").textContent = newGameSession.player2Name || "Player 2";
        document.querySelector(".player_one_games").textContent = newGameSession.player1GamesPlayed || "0";
        document.querySelector(".player_two_games").textContent = newGameSession.player2GamesPlayed || "0";
        document.querySelector(".player_one_won").textContent = newGameSession.player1GamesWon || "0";
        document.querySelector(".player_two_won").textContent = newGameSession.player2GamesWon || "0";
    }
}

function prepareGame(){

    for (let i = 0; i < dimensions; i++) {
        let row = []
        for (let j = 0; j < dimensions; j++) {
            row.push(" ")
            const cell = document.createElement('div')
            cell.dataset.indice = i.toString() + "-" + j.toString()
            cell.classList.add("cell")
            cell.addEventListener('click', setCell)
            grid.append(cell)
        }
        gameSheet.push(row)
    }
}

function startTwoPlayerGame() {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    storeAndRetrieveGameSession(player1Name,player2Name)
    /*document.getElementById("mode-selection").style.display = "none";*/
    card.style.display = "none"
    document.getElementById("game").style.display = "flex";
    prepareGame();
    twoPlayersMode = true
}

function startComputerGame() {
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("game").style.display = "flex";
    prepareGame();
    currentPlayer = playerOne;
}

function setCell() {
    const alert = document.querySelector(".alert");
    const alertText = document.querySelector(".alert_text");
    if (gameOver){
        console.log("game over")
        return;
    }
    let keys = this.dataset.indice.split("-")
    let row = parseInt(keys[0])
    let column = parseInt(keys[1])
    if (gameSheet[row][column] !== ' ') {

        alert.style.display = "block"
        alertText.textContent = "Cell already filled!";
        setTimeout(() => {
            alertText.textContent = "";
            alert.style.display = "none"
        }, 4000);
        return;
    }
    gameSheet[row][column] = currentPlayer
    let ship = this;
    if(currentPlayer === playerOne){
        ship.classList.add("x-ship")
        currentPlayer = playerTwo
    }else{
        ship.classList.add("o-ship")
        currentPlayer = playerOne
    }
    checkWinner(row, column)

    if (filledTable(gameSheet)) {
        alert.style.display = "block"
        alertText.textContent = "It's a Tie!";
        setTimeout(() => {
            alertText.textContent = "";
            alert.style.display = "none"
        }, 4000);
    }
    if (currentPlayer === playerTwo && !twoPlayersMode) {
        isComputerTurn = true;
        makeComputerMove();
        console.log(evaluateBoard(gameSheet))
    }
}

/*function makeComputerMove(){
    const availableCells = document.querySelectorAll('.cell:not(.x-ship):not(.o-ship)')
    if (availableCells.length > 0){
        const randomIndex = Math.floor(Math.random() * availableCells.length)
        const cellToClick = availableCells[randomIndex]
        setTimeout(() => {
            cellToClick.click();
        },1000)
    }
}*/

function checkWinner(row, column){
    for (let i = 0; i < dimensions-4; i++) {
        if(gameSheet[row][i] !== ' '){
            if (gameSheet[row][i] === gameSheet[row][i+1] && gameSheet[row][i+1] === gameSheet[row][i+2] && gameSheet[row][i+2] === gameSheet[row][i+3] && gameSheet[row][i+3] === gameSheet[row][i+4]){
                 gameOver = true;
                announceWinner(row,i)
                return;
            }
        }
    }

    for (let j = 0; j < dimensions-4; j++) {
        if(gameSheet[j][column] !== ' '){
            if (gameSheet[j][column] === gameSheet[j+1][column] && gameSheet[j+1][column] === gameSheet[j+2][column] && gameSheet[j+2][column] === gameSheet[j+3][column] && gameSheet[j+3][column] === gameSheet[j+4][column]){
                 gameOver = true;
                announceWinner(j,column)
                return;
            }
        }
    }

    for (let i = 0; i < dimensions - 4; i++) {
        for (let j = 0; j < dimensions-4; j++) {
            if (gameSheet[i][j] !== " "){
                if (gameSheet[i][j] === gameSheet[i+1][j+1] && gameSheet[i+1][j+1] === gameSheet[i+2][j+2] && gameSheet[i+2][j+2] === gameSheet[i+3][j+3] && gameSheet[i+3][j+3] === gameSheet[i+4][j+4]){
                     gameOver = true;
                    announceWinner(i,j)
                    return;
                }
            }
        }
    }

    for (let i = 4; i < dimensions - 4; i++) {
        for (let j = 0; j < dimensions-4; j++) {
            if (gameSheet[i][j] !== " "){
                if (gameSheet[i][j] === gameSheet[i-1][j+1] && gameSheet[i-1][j+1] === gameSheet[i-2][j+2] && gameSheet[i-2][j+2] === gameSheet[i-3][j+3] && gameSheet[i-3][j+3] === gameSheet[i-4][j+4]){
                     gameOver = true;
                    announceWinner(i,j)
                    return;
                }
            }
        }
    }

}

function announceWinner(row, column){
    const player1Name = document.getElementById("player1").value || "Player 1";
    const player2Name = document.getElementById("player2").value || "Player 2";

    let winner = gameSheet[row][column] === playerOne ? player1Name : player2Name;
    console.log(winner)

    // Retrieve player names from local storage for the current players
    const playerNames = JSON.parse(localStorage.getItem("gameSessions"));
    if (playerNames) {
        const currentPlayer1 = playerNames.find(session => {
            return (
                session.player1Name === player1Name || session.player1Name === player2Name
            );
        });
        const currentPlayer2 = playerNames.find(session => {
            return (
                session.player2Name === player1Name || session.player2Name === player2Name
            );
        });
        const player1NameFromStorage = currentPlayer1 ? currentPlayer1.player1Name : "Player 1";
        const player2NameFromStorage = currentPlayer2 ? currentPlayer2.player2Name : "Player 2";
        const winnerName = winner === player1Name ? player1NameFromStorage : player2NameFromStorage;
        const winMessage = document.querySelector('.win_message');
        const winningPlayer = winMessage.querySelector('.winning_player');
        winningPlayer.textContent = `${winnerName} Has Won the game`;
        winMessage.style.display = "block";
        setTimeout(() => {
            winMessage.style.display = "none";
        }, 4000);
    } else {
        console.log(`${winner} Wins`);
    }

    // Call updateGameSessionStats to update statistics
    updateGameSessionStats(player1Name, player2Name, winner);
}

function updateGameSessionStats(player1Name, player2Name, winner) {
    // Retrieve existing game sessions from local storage (if any)
    let gameSessions = JSON.parse(localStorage.getItem("gameSessions")) || [];

    // Find the game session that matches the provided player names
    const selectedGameSession = gameSessions.find(session => {
        return (
            (session.player1Name === player1Name && session.player2Name === player2Name) ||
            (session.player1Name === player2Name && session.player2Name === player1Name)
        );
    });

    if (selectedGameSession) {
        // Update games played for both players
        selectedGameSession.player1GamesPlayed += 1;
        selectedGameSession.player2GamesPlayed += 1;

        // Check the winner and update games won for the respective player
        if (winner === player1Name) {
            selectedGameSession.player1GamesWon += 1;
        } else if (winner === player2Name) {
            selectedGameSession.player2GamesWon += 1;
        }

        // Store the updated game session in local storage
        localStorage.setItem("gameSessions", JSON.stringify(gameSessions));
    }
}

/*prepareGame()*/

function filledTable(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    /*console.log('numRows:', numRows);*/
    console.log('numCols:', numCols);
    /*console.log('Matrix:', matrix);*/

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (gameSheet[row][col] === ' ') {
                return false;
            }
        }
    }
    return true;
}
function clearGameBoard() {
    // Clear the game board by removing any X or O classes or resetting the board state
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("x-ship", "o-ship");
        // You may also need to reset the gameSheet array or other game-related data
    });
}
function resetVariables() {
    // Reset any game-related variables like currentPlayer, gameOver, etc.
    currentPlayer = playerOne;
    gameOver = false;
}
function resetGame() {
    clearGameBoard();
    resetVariables();
}
resetButton.addEventListener("click", () => {
    // Perform game reset actions here
    resetGame();
});
twoPlayerButton.addEventListener("click", startTwoPlayerGame);
/*
computerButton.addEventListener("click", startComputerGame);*/
