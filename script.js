const gameBoardArr = ['', '', '', '', '', '', '', '', ''];
const grids = document.querySelectorAll(".game-subgrid");

// player object creater
const player = (name, symbol, turn) => {

    // control any win situation
    const isWin = () => {
        if ((gameBoardArr[0] === symbol && gameBoardArr[1] === symbol && gameBoardArr[2] === symbol)) return endGame();
        if ((gameBoardArr[3] === symbol && gameBoardArr[4] === symbol && gameBoardArr[5] === symbol)) return endGame();
        if ((gameBoardArr[6] === symbol && gameBoardArr[7] === symbol && gameBoardArr[8] === symbol)) return endGame();
        if ((gameBoardArr[0] === symbol && gameBoardArr[3] === symbol && gameBoardArr[6] === symbol)) return endGame();
        if ((gameBoardArr[1] === symbol && gameBoardArr[4] === symbol && gameBoardArr[7] === symbol)) return endGame();
        if ((gameBoardArr[2] === symbol && gameBoardArr[5] === symbol && gameBoardArr[8] === symbol)) return endGame();
        if ((gameBoardArr[0] === symbol && gameBoardArr[4] === symbol && gameBoardArr[8] === symbol)) return endGame();
        if ((gameBoardArr[2] === symbol && gameBoardArr[4] === symbol && gameBoardArr[6] === symbol)) return endGame();
    }

    // end game dialog
    const endGame = () => {

        const endGameDialog = document.querySelector('#end-game-dialog');
        endGameDialog.showModal();
        // winner text
        endGameDialog.children[0].innerHTML = `${obj.symbol} win`;

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
    const resetGame = () => {
        // reset array
        for (item in gameBoardArr) {
            gameBoardArr[item] = "";
        }
        // reset grid display
        grids.forEach((grid) => {
            grid.innerHTML = "";
        })
    };

    // close dialog
    const closeDialog = () => {
        const endGameDialog = document.querySelector('#end-game-dialog');
        endGameDialog.close();
    }

    // check whether game ends.
    const isGridEnable = true;

    return { addSymbol, resetGame, closeDialog, isGridEnable };

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

// ignore clickin grid after pressing exit button
document.addEventListener('click', (e) => {
    if (gameBoard.isGridEnable === false) {
        if (e.target.closest('.game-subgrid')) {
            e.stopPropagation();
        }
    }
},
true
)

// restart button
document.querySelector(".restart-btn").addEventListener('click', () => {
    gameBoard.resetGame();
    gameBoard.isGridEnable = true;
    playerOne.turn = 'true';
    playerTwo.turn = 'false';
});
// dialog restart button
document.querySelector('#play-again-btn').addEventListener('click',() => {
    gameBoard.resetGame();
    gameBoard.closeDialog();
    gameBoard.isGridEnable = true;
    playerOne.turn = 'true';
    playerTwo.turn = 'false';
});
//dialog exit button
document.querySelector('#exit-btn').addEventListener('click', () =>{
    gameBoard.closeDialog();
    gameBoard.isGridEnable = false;
});