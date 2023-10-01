function evaluateBoard(matrix){
    const dimensions = matrix.length

    for (let i = 0; i < dimensions; i++) {
        for (let j=0; j<dimensions-4;j++){
            if (
                gameSheet[i][j] !== " " &&
                gameSheet[i][j] === gameSheet[i][j + 1] &&
                gameSheet[i][j + 1] === gameSheet[i][j + 2] &&
                gameSheet[i][j + 2] === gameSheet[i][j + 3] &&
                gameSheet[i][j + 3] === gameSheet[i][j + 4]
            ) {
                return gameSheet[i][j] === playerOne ? 1 : -1;
            }
        }
    }

    for (let i = 0; i <= dimensions - 5; i++) {
        for (let j = 0; j < dimensions; j++) {
            if (
                gameSheet[i][j] !== " " &&
                gameSheet[i][j] === gameSheet[i + 1][j] &&
                gameSheet[i + 1][j] === gameSheet[i + 2][j] &&
                gameSheet[i + 2][j] === gameSheet[i + 3][j] &&
                gameSheet[i + 3][j] === gameSheet[i + 4][j]
            ) {
                return gameSheet[i][j] === playerOne ? 1 : -1;
            }
        }
    }

    for (let i = 0; i <= dimensions - 4; i++) {
        for (let j = 0; j <= dimensions - 4; j++) {
            if (
                gameSheet[i][j] !== " " &&
                gameSheet[i][j] === gameSheet[i + 1][j + 1] &&
                gameSheet[i + 1][j + 1] === gameSheet[i + 2][j + 2] &&
                gameSheet[i + 2][j + 2] === gameSheet[i + 3][j + 3] &&
                gameSheet[i + 3][j + 3] === gameSheet[i + 4][j + 4]
            ) {
                return gameSheet[i][j] === playerOne ? 1 : -1; // Player One win: +1, Player Two win: -1
            }
        }
    }

    for (let i = 0; i <= dimensions - 4; i++) {
        for (let j = dimensions - 1; j >= 4; j--) {
            if (
                gameSheet[i][j] !== " " &&
                gameSheet[i][j] === gameSheet[i + 1][j - 1] &&
                gameSheet[i + 1][j - 1] === gameSheet[i + 2][j - 2] &&
                gameSheet[i + 2][j - 2] === gameSheet[i + 3][j - 3] &&
                gameSheet[i + 3][j - 3] === gameSheet[i + 4][j - 4]
            ) {
                return gameSheet[i][j] === playerOne ? 1 : -1;
            }
        }
    }
    if (filledTable(gameSheet)){
        return 0
    }

    return null

}

f

function minimax(matrix, depth, isMaximizingPlayer, alpha, beta) {
    console.log(matrix)
    if (depth === dimensions * dimensions) {
        return evaluateBoard(matrix);
    }

    if (isMaximizingPlayer) {
        let bestMove = null;
        let bestScore = -Infinity;
        for (let i = 0; i < dimensions; i++) {
            for (let j = 0; j < dimensions; j++) {
                if (matrix[i][j] === " ") {
                    matrix[i][j] = playerOne;
                    const score = minimax(matrix, depth + 1, false, alpha, beta);
                    matrix[i][j] = " ";
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { row: i, column: j };
                    }
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }

        return bestMove;
    } else {
        let bestMove = null;
        let bestScore = Infinity;
        for (let i = 0; i < dimensions; i++) {
            for (let j = 0; j < dimensions; j++) {
                if (matrix[i][j] === " ") {
                    matrix[i][j] = playerTwo;
                    const score = minimax(matrix, depth + 1, true, alpha, beta);
                    matrix[i][j] = " ";
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = { row: i, column: j };
                    }
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }

        return bestMove;
    }
}

/*function minimax(matrix, depth, isMaximizingPlayer){
    const gameState = evaluateBoard(matrix)
    console.log(gameState)
    const score = 0
    let isDraw = false;

    if (depth === dimensions * dimensions) {
        isDraw = true;
    }

    if (isDraw) {
        return { score: 0 };
    }

    if (gameState !== null) {
        return { score: gameState };
    }

    if (isMaximizingPlayer){
        let bestScore = -Infinity
        let bestMove = {row: null, column: null}
        for (let i = 0; i < dimensions; i++){
            for (let j = 0; j < dimensions; j++){
                if(matrix[i][j] === ' '){
                    matrix[i][j] = playerOne;
                    const score = minimax(matrix, depth+1, false).score
                    matrix[i][j] = ' '
                    if (score > bestScore){
                        bestScore = score
                        bestMove.row = i
                        bestMove.column = j
                    }
                }
            }
        }
        console.log(bestMove.row)

        return bestMove
    }else {
        let bestScore = Infinity
        let bestMove = {row: null, column: null}
        for (let i = 0; i < dimensions; i++) {
            for (let j = 0; j < dimensions; j++) {
                if(matrix[i][j] === ' '){
                    matrix[i][j] = playerTwo

                    const score = minimax(matrix, depth+1, true).score
                    matrix[i][j] = ' '
                    if (score < bestScore){
                        bestScore = score
                        bestMove.row = i
                        bestMove.column = j
                    }
                }
            }

        }
        return bestMove
    }
}*/

function makeComputerMove(){
    /*console.log(gameSheet)*/
    const bestMove = minimax(gameSheet, 0, true, -Infinity, Infinity);
    console.log(bestMove)
    const row = bestMove.row
    const column = bestMove.column
    console.log(row, column)

    const cellToClick = document.querySelector(`[data-indice="${row}-${column}"]`)
    setTimeout(() => {
        cellToClick.click();
    }, 1000);
    /*const availableCells = document.querySelectorAll('.cell:not(.x-ship):not(.o-ship)')
    if (availableCells.length > 0){
        const randomIndex = Math.floor(Math.random() * availableCells.length)
        const cellToClick = availableCells[randomIndex]
        setTimeout(() => {
            cellToClick.click();
        },1000)
    }*/
}