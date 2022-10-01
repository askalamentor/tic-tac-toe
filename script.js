const gameBoardArr = ['','','','','','','','',''];
const grids = document.querySelectorAll(".game-subgrid");

// player object creater
const player = (name, symbol, turn) => { 
    
    // control any win situation
    const isWin = () => {
        if ((gameBoardArr[0] === symbol && gameBoardArr[1] === symbol && gameBoardArr[2] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[3] === symbol && gameBoardArr[4] === symbol && gameBoardArr[5] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[6] === symbol && gameBoardArr[7] === symbol && gameBoardArr[8] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[0] === symbol && gameBoardArr[3] === symbol && gameBoardArr[6] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[1] === symbol && gameBoardArr[4] === symbol && gameBoardArr[7] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[2] === symbol && gameBoardArr[5] === symbol && gameBoardArr[8] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[0] === symbol && gameBoardArr[4] === symbol && gameBoardArr[8] === symbol)) return console.log(`${name} win`);
        if ((gameBoardArr[2] === symbol && gameBoardArr[4] === symbol && gameBoardArr[6] === symbol)) return console.log(`${name} win`);
    }

    // control x-o turn
    const changeTurn = () => {
        if (obj.turn === 'true') {
            obj.turn = 'false';
        } else if (obj.turn === 'false') {
            obj.turn = 'true';
        }
    }

    const obj = { name, symbol, isWin, changeTurn, turn };

    return obj;

}

// create players
const playerOne = player('playerone', 'X', 'true');
const playerTwo = player('playertwo', 'O', 'false');

// gameboard module
const gameBoard = (() => {

    // add x-o
    const addSymbol = (gameBoardArr, symbol, index) => {
        gameBoardArr[index] = symbol;
    };

    // reset
    const  resetGame = () => {
        // reset array
        for (item in gameBoardArr) {
            gameBoardArr[item] = "";
        }
        // reset grid display
        grids.forEach((grid) => {
            grid.innerHTML = "";
        })
    };

    return { addSymbol, resetGame };

})();

// add x-o to grid areas
grids.forEach((grid) => {
    grid.addEventListener('click', () => {

        const index = [...grid.parentElement.children].indexOf(grid);

        // control turn
        if (playerOne.turn === 'true') {
            symbol = playerOne.symbol;
            playerOne.changeTurn();
            playerTwo.changeTurn();
        } else if (playerTwo.turn === 'true') {
            symbol = playerTwo.symbol;
            playerOne.changeTurn();
            playerTwo.changeTurn();
        }

        // add x-o
        gameBoard.addSymbol(gameBoardArr, symbol, index);

        // display x-o on grid areas
        grid.innerHTML = symbol;

        // control win
        playerOne.isWin();
        playerTwo.isWin();
    })
})

// restart button
document.querySelector(".restart-btn").addEventListener('click', gameBoard.resetGame);