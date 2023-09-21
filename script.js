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
        for (let j = 0; j < dimensions; j++) {
            if(gameSheet[row][column] != " ") {
                let diagAbove = gameSheet[row][column] == gameSheet[row+1][column+1] && gameSheet[row+1][column+1] == gameSheet[row+2][column+2] && gameSheet[row+2][column+2] == gameSheet[row+3][column+3] && gameSheet[row+3][column+3] == gameSheet[row+4][column+4]
                let diagBelow = gameSheet[row][column] == gameSheet[row-1][column+1] && gameSheet[row-1][column+1] == gameSheet[row-2][column+2] && gameSheet[row-2][column+2] == gameSheet[row-3][column+3] && gameSheet[row-3][column+3] == gameSheet[row-4][column+4]
                let diagBelowlr = gameSheet[row][column] == gameSheet[row-1][column-1] && gameSheet[row-1][column-1] == gameSheet[row-2][column-2] && gameSheet[row-2][column-2] == gameSheet[row-3][column-3] && gameSheet[row-3][column-3] == gameSheet[row-4][column-4]
                let diagBelowrn = gameSheet[row][column] == gameSheet[row+1][column-1] && gameSheet[row+1][column-1] == gameSheet[row+2][column-2] && gameSheet[row+2][column-2] == gameSheet[row+3][column-3] && gameSheet[row+3][column-3] == gameSheet[row+4][column-4]
                if (diagAbove){
                    console.log("brtl")
                    break
                }else if(diagBelow){
                    console.log("trbl")
                    break
                }else if (diagBelowlr){
                    console.log("tlbr")
                }else if(diagBelowrn){
                    console.log("bltr")
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