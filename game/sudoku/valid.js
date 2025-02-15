var board;
var rows = 9;
var columns = 9;
var grids3x3;

window.onload = function () {
    document.getElementById("reset-button").addEventListener("click", resetGame);
    document.getElementById("validate-button").addEventListener("click", validate);
    board = Array.from({ length: 9 }, () => Array(9).fill(null));
    setGame();
}

function resetGame() {
    document.getElementById("board").innerHTML = "";

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            board[i][j] = null;
        }
    }

    const message = document.getElementById("resultMessage");
    message.classList.remove("messageValid", "messageInvalid");
    message.innerText = "";
    setGame();
}

function setGame() {
    grids3x3 = [];
    for (let i = 0; i < 9; ++i) {
        const grid3x3Div = document.createElement("div");
        grid3x3Div.classList.add("square3x3");
        grids3x3.push(grid3x3Div);
    }

    let id = 0;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            let square = document.createElement("div");
            square.id = i.toString() + '-' + j.toString();
            square.tabIndex = 0;
            square.classList.add("square");
            
            square.addEventListener("focus", () => {
                highlightSameRowsAndCols(i, j);
            });

            square.addEventListener("blur", () => {
                clearHighlight();
            });

            square.addEventListener("keydown", (event) => {
                const message = document.getElementById("resultMessage");
                message.classList.remove("messageValid", "messageInvalid");
                message.innerText = "";
                if (event.key >= 1 && event.key <= 9) {
                    board[i][j] = event.key;
                    square.innerText = event.key;
                } else if (event.key === "Backspace") {
                    board[i][j] = null;
                    square.innerText = "";
                }
            });
            
            let idx = i*9+j;
            id = Math.floor((idx % 9) / 3) + Math.floor(idx / 27) * 3;
            grids3x3[id].appendChild(square);
        }
    }

    for (let i = 0; i < 9; ++i) {
        document.getElementById("board").appendChild(grids3x3[i]);
    }
}

function highlightSameRowsAndCols(r, c) {
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            const square = document.getElementById(i.toString() + '-' + j.toString());
            if ((i === r || j === c)) {
                square.classList.add("squareHighlight");
            }
        }
    }
}

function clearHighlight() {
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            const square = document.getElementById(i.toString() + '-' + j.toString());
            square.classList.remove("squareHighlight");
        }
    }
}

function validate() {
    let isValid = true;
    const seen = new Set();

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            const value = board[i][j];
            if (value) {
                const rowKey = `row-${i}-${value}`;
                const colKey = `col-${j}-${value}`;
                const gridKey = `grid-${Math.floor(i / 3)}-${Math.floor(j / 3)}-${value}`;

                if (seen.has(rowKey) || seen.has(colKey) || seen.has(gridKey)) {
                    console.log(i, j);
                    isValid = false;
                    break;
                }

                seen.add(rowKey);
                seen.add(colKey);
                seen.add(gridKey);
            }
        }
    }

    const message = document.getElementById("resultMessage");
    message.classList.remove("messageValid", "messageInvalid");
    if (isValid) {
        message.innerText = "Valid!";
        message.classList.add("messageValid");
    } else {
        message.innerText = "Invalid!";
        message.classList.add("messageInvalid");
    }
}