const grid = document.querySelector('.grid')
const gameSheet = []
let playerOne = "X"
let playerTwo = "O"
let currentPlayer = playerOne
const dimensions = 20
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


function setCell() {
    let keys = this.dataset.indice.split("-")
    let row = parseInt(keys[0])
    let column = parseInt(keys[1])
    gameSheet[row][column] = currentPlayer
    let ship = this;
    if(currentPlayer === playerOne){
        ship.classList.add("x-ship")
        currentPlayer = playerTwo
    }else{
        ship.classList.add("o-ship")
        currentPlayer = playerOne
    }
    /*console.log(row , column,gameSheet[row][column])*/
    /*searchRow = ship.dataset.indice.split()*/
    checkWinner(row, column)
}

function checkWinner(row, column){
    for (let i = 0; i < dimensions-4; i++) {
        if(gameSheet[row][i] !== ' '){
            if (gameSheet[row][i] === gameSheet[row][i+1] && gameSheet[row][i+1] === gameSheet[row][i+2] && gameSheet[row][i+2] === gameSheet[row][i+3] && gameSheet[row][i+3] === gameSheet[row][i+4]){
                /*console.log("Winner")*/
                announceWinner(row,i)
                return;
            }
        }
    }

    for (let j = 0; j < dimensions-4; j++) {
        if(gameSheet[j][column] !== ' '){
            console.log(gameSheet[j][column])
            /*console.log(gameSheet[row][], gameSheet[row][])*/
            if (gameSheet[j][column] === gameSheet[j+1][column] && gameSheet[j+1][column] === gameSheet[j+2][column] && gameSheet[j+2][column] === gameSheet[j+3][column] && gameSheet[j+3][column] === gameSheet[j+4][column]){
                /*console.log("Winner")*/
                announceWinner(j,column)
                return;
            }
        }
    }

    for (let i = 0; i < dimensions - 4; i++) {
        for (let j = 0; j < dimensions-4; j++) {
            if (gameSheet[i][j] !== " "){
                if (gameSheet[i][j] === gameSheet[i+1][j+1] && gameSheet[i+1][j+1] === gameSheet[i+2][j+2] && gameSheet[i+2][j+2] === gameSheet[i+3][j+3] && gameSheet[i+3][j+3] === gameSheet[i+4][j+4]){
                    announceWinner(i,j)
                    return;
                }
            }
        }
    }

    for (let i = 0; i < dimensions - 4; i++) {
        for (let j = 0; j < dimensions-4; j++) {
            if (gameSheet[i][j] !== " "){
                if (gameSheet[i][j] === gameSheet[i-1][j+1] && gameSheet[i-1][j+1] === gameSheet[i-2][j+2] && gameSheet[i-2][j+2] === gameSheet[i-3][j+3] && gameSheet[i-3][j+3] === gameSheet[i-4][j+4]){
                    announceWinner(i,j)
                    return;
                }
            }
        }
    }

}

function announceWinner(row, column){
    if (gameSheet[row][column] === playerOne){
        console.log("Player One Wins")
    }else{
        console.log("Player Two Wins")
    }
}
prepareGame()