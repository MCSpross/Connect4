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
            boards.Helpers.debugDrawGrid(match.gameboard);
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
        if (match.moves.length >= (match.gameboard.rows * match.gameboard.columns) && match.winningPlayer == -1) {
            console.log("Game is a tie");
            match.winningPlayer = 0;
            return match;
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
        let playerNumber = lastMove.playerNumber;
        if (checkArrayForConnect4(boards.Helpers.getRow(match.gameboard, lastMove.row), playerNumber) ||
            checkArrayForConnect4(boards.Helpers.getColumn(match.gameboard, lastMove.column), playerNumber) ||
            checkArrayForConnect4(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, true), playerNumber) ||
            checkArrayForConnect4(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, false), playerNumber)) {
            return lastMove.playerNumber;
        }
        else {
            return -1;
        }
    }
    Helpers.checkForVictory = checkForVictory;
    function checkForLongestStreak(match, playerNumber) {
        let lastMove = match.moves[match.moves.length - 1];
        let longestStreak = Math.max(1, checkArrayForConsecutiveDots(boards.Helpers.getRow(match.gameboard, lastMove.row), playerNumber));
        longestStreak = Math.max(longestStreak, checkArrayForConsecutiveDots(boards.Helpers.getColumn(match.gameboard, lastMove.column), playerNumber));
        longestStreak = Math.max(longestStreak, checkArrayForConsecutiveDots(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, true), playerNumber));
        longestStreak = Math.max(longestStreak, checkArrayForConsecutiveDots(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, false), playerNumber));
        return longestStreak;
    }
    Helpers.checkForLongestStreak = checkForLongestStreak;
    function checkArrayForConnect4(array, numberToCheck) {
        if (checkArrayForConsecutiveDots(array, numberToCheck) >= 4) {
            return true;
        }
        return false;
    }
    Helpers.checkArrayForConnect4 = checkArrayForConnect4;
    function checkArrayForConsecutiveDots(array, numberToCheck) {
        let last = -1, streak = 1, longestStreak = 0;
        for (let n of array) {
            if (n == numberToCheck && n == last) {
                streak++;
                if (streak > longestStreak)
                    longestStreak = streak;
            }
            else {
                streak = 1;
            }
            last = n;
        }
        return longestStreak;
    }
    Helpers.checkArrayForConsecutiveDots = checkArrayForConsecutiveDots;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
