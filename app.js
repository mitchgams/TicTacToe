let cells = document.querySelectorAll('.row > div');
let currentPlayer = "X";
let gameOver = false;
let board = ["","","","","","","","",""];
let playCount = 0;


/* Had to create this function to fix a bug that caused the player to change if you clicked a cell that already had a play */
function refreshListener() {
    for ( let i=0; i < cells.length; i++) {
        //console.log(cells[i].innerHTML);
        if(cells[i].innerHTML == "") {
            cells[i].addEventListener('click', cellClicked);
        } else {
            cells[i].removeEventListener('click', cellClicked);
        }
    }
}

refreshListener();

function cellClicked () {
    if(!gameOver) {  // can only make plays if the game hasn't been won
        event.target.innerHTML = `<img src='./${currentPlayer}img.png'>`;
        event.target.id = currentPlayer;
        updateBoard();
        checkBoard();
        if(currentPlayer == "X") {
            currentPlayer = "O";
        } else if(currentPlayer == "O") {
            currentPlayer = "X";
        }
    } else {
        resetBoard();
    }
}

function updateBoard() {
    console.log(cells);
    for ( let i=0; i < cells.length; i++) {
        board[i] = cells[i].id;
    }
}

function resetBoard() {
    for(let i = 0; i < cells.length; i++) {                             // resets board
        document.querySelectorAll('.row > div')[i].textContent = "";    // resets board image
        document.querySelectorAll('.row > div')[i].id = "";             // resets cell id, which is where i stored the value
    }
    document.getElementById('winner').textContent = "";                 // removes winner notification
    gameOver = false;                                                   // reopens game
    playCount = 0;
    refreshListener();
}

/***************
 * board layout
 *   0  1  2
 *   3  4  5
 *   6  7  8
 ***************/
function checkBoard() {
    //console.log(board);
    if(board[0] != "") {                                            // checking from board[0]
        if(board[0] == board[1] && board[0] == board[2]) {          // board[0] Horizontal
            callWinner();
        } else if(board[0] == board[4] && board[0] == board[8]) {   // board[0] Diagonal
            callWinner();
        } else if(board[0] == board[3] && board[0] == board[6]) {   // board[0] Vertical
            callWinner();
        }
    }
    if(board[3] != "" && board[3] == board[4] && board[3] == board[5]) { // board[3] Horizontal
        callWinner();
    } else if(board[6] != "") {                                         // checking from board[6]
        if(board[6] == board[7] && board[6] == board[8]) {              // board[6] Horizontal
            callWinner();
        } else if(board[6] == board[4] && board[6] == board[2]) {       // board[6] Diagonal
            callWinner();
        }
    }
    if(board[1] != "" && board[1] == board[4] && board[1] == board[7]) {  // board[1] Vertical
        callWinner();
    } else if(board[2] != "" && board[2] == board[5] && board[2] == board[8]) { // board[2] Vertical
        callWinner();
    }
    playCount = playCount + 1;
    if(playCount == 9 && !gameOver) {
        document.getElementById('winner').innerHTML = "Draw!";
        gameOver = true;
        setTimeout(() => {resetBoard();}, 3000);    // resets board after 3 seconds since all event listeners have been deleted.
    }
    refreshListener();
}
function callWinner() {
    gameOver = true;
    document.getElementById("winner").textContent = currentPlayer + " has won the game!";
    //console.log(currentPlayer + " wins!");
}