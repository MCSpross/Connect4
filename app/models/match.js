"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boards = require("./gameboard");
const moves = require("./move");
var Helpers;
(function (Helpers) {
    function create(rows, columns) {
        let board = boards.Helpers.create(6, 7);
        return { playerOneId: "p1", playerTwoId: "p2", gameboard: board, moves: [], activePlayerNumber: 1, winningPlayer: -1 };
    }
    Helpers.create = create;
    function addMove(match, column) {
        let openRowInColumn = boards.Helpers.getFirstOpenSlotInColumn(match.gameboard, column);
        if (openRowInColumn == -1) {
            console.log("Column is full");
            return match;
        }
        if (match.winningPlayer != -1) {
            console.log("Match is over. No new moves.");
            return match;
        }
        match.gameboard = boards.Helpers.applyMove(match.gameboard, openRowInColumn, column, match.activePlayerNumber);
        match.moves.push(moves.Helpers.create(match.activePlayerNumber, openRowInColumn, column));
        let potentialVictor = checkForVictory(match);
        if (potentialVictor != -1) {
            match.winningPlayer = potentialVictor;
        }
        match.activePlayerNumber = toggleActivePlayer(match.activePlayerNumber);
        return match;
    }
    Helpers.addMove = addMove;
    function undoLastMove(match) {
        if (match.moves.length < 1) {
            console.log("no moves to undo");
            return match;
        }
        let lastMove = match.moves.pop();
        match.gameboard = boards.Helpers.applyMove(match.gameboard, lastMove.row, lastMove.column, 0);
        match.activePlayerNumber = toggleActivePlayer(match.activePlayerNumber);
        match.winningPlayer = -1;
        return match;
    }
    Helpers.undoLastMove = undoLastMove;
    function toggleActivePlayer(curPlayerNumber) {
        if (curPlayerNumber == 1)
            return 2;
        else
            return 1;
    }
    Helpers.toggleActivePlayer = toggleActivePlayer;
    function checkForVictory(match) {
        let lastMove = match.moves[match.moves.length - 1];
        if (checkArrayForConnect4(boards.Helpers.getRow(match.gameboard, lastMove.row)) ||
            checkArrayForConnect4(boards.Helpers.getColumn(match.gameboard, lastMove.column)) ||
            checkArrayForConnect4(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, true)) ||
            checkArrayForConnect4(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, false))) {
            return lastMove.playerNumber;
        }
        else {
            return -1;
        }
    }
    Helpers.checkForVictory = checkForVictory;
    function checkArrayForConnect4(array) {
        let last = -1, streak = 1;
        for (let n of array) {
            if (n != 0 && n == last) {
                streak++;
                if (streak >= 4)
                    return true;
            }
            else {
                streak = 1;
            }
            last = n;
        }
        return false;
    }
    Helpers.checkArrayForConnect4 = checkArrayForConnect4;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
