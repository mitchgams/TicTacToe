/********
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
const combos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2]
];

const cells = document.querySelectorAll('.row > div');

let game = {
    currentPlayer: "X",
    playCount: 0,
    isOver: false,
    togglePlayer: function() {
        this.currentPlayer === "X" ? (this.currentPlayer = "O") : (this.currentPlayer = "X");
    },
    reset: function() {
        this.currentPlayer = "X";
        this.playCount = 0;
        this.isOver = false;
        for(const cell of cells) cell.textContent = "";    
    }
};

for(const cell of cells) cell.addEventListener('click', cellClicked);

function cellClicked(e) {
    if(game.isOver) {
        game.reset();
        return;
    }
    if(e.target.textContent !== "") return;

    e.target.textContent = game.currentPlayer;
    game.playCount++;

    checkWinner();

    game.togglePlayer();
}

function checkWinner() {
    for(const combo of combos) {
        const [a, b, c] = combo;
        if(cells[a].textContent === game.currentPlayer && cells[b].textContent === game.currentPlayer && cells[c].textContent === game.currentPlayer) {
            console.log(`${game.currentPlayer} Wins!`);
            game.isOver = true;
        }
    }
    if(game.playCount === 9 && !game.isOver) {
        console.log("Draw!");
        game.isOver = true;
    }
}

