// import { useState } from 'react';

var board;
var turns = 0;
var player;
var rows = 3;
var columns = 3;
var win = false;
var gameOver = false;

window.onload = function () {
    document.getElementById("message").innerText = "Player 1's turn";
    setGame();
}

function setGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            let square = document.createElement("div");
            square.id = i.toString() + '-' + j.toString();
            square.classList.add("square");
            square.addEventListener("click", function () { setPiece(square, i*3+j) });
            document.getElementById("board").append(square);
        }
    }
}

function setPiece(square, num) {
    if (gameOver || square.classList.contains("squareX") || square.classList.contains("squareO")) {
        return;
    }

    let r = Math.floor(num/3), c = num%3;
    turns++;
    player = (turns&1) ? 'X' : 'O';
    board[r][c] = player;

    document.getElementById("message").innerText = "Player " + ((turns&1) ? '2' : '1') + "'s turn";

    square.innerText = player;
    square.classList.add("square" + player);

    checkWinner(num);
}

function checkWinner(num) {
    let r = Math.floor(num/3), c = num%3;

    // Check row
    if (board[r][0] === board[r][1] && board[r][1] === board[r][2]) {
        win = true;
    }

    // Check column
    if (board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
        win = true;
    }

    // Check diagonal
    if (r === c && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        win = true;
    }

    // Check anti-diagonal
    if (r + c === 2 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        win = true;
    }

    if (win) {
        gameOver = true;
        document.getElementById("message").innerText = "Player " + ((player == 'X') ? '1' : '2') + " wins!";
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < columns; ++j) {
                let square = document.getElementById(i.toString() + '-' + j.toString());
                square.classList.add("squareDisabled");
            }
        }
        return;
    }

    if (turns > 8) {
        gameOver = true;
        document.getElementById("message").innerText = "It's a tie!";
        return;
    }
}