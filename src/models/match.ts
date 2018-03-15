import * as boards from './gameboard';
import * as moves from './move';

export interface Match {
    playerOneId: string;
    playerTwoId: string;
    gameboard: boards.Gameboard;
    moves: Array<moves.Move>;
    activePlayerNumber: number;
    winningPlayer: number
}

export namespace Helpers {
    export function create(rows: number, columns: number): Match {
        let board: boards.Gameboard = boards.Helpers.create(6, 7);
        return { playerOneId: "p1", playerTwoId: "p2", gameboard: board, moves: [], activePlayerNumber: 1, winningPlayer: -1 }
    }

    export function addMove(match: Match, column: number) {
        let openRowInColumn = boards.Helpers.getFirstOpenSlotInColumn(match.gameboard, column)
        if (openRowInColumn == -1) {
            console.log("Column is full")
            return match;
        }
        if (match.winningPlayer != -1) {
            console.log("Match is over. No new moves.");
            return match;
        }
        match.gameboard = boards.Helpers.applyMove(match.gameboard, openRowInColumn, column, match.activePlayerNumber);

        match.moves.push(
            moves.Helpers.create(match.activePlayerNumber, openRowInColumn, column)
        );
        let potentialVictor = checkForVictory(match);
        if (potentialVictor != -1) {
            match.winningPlayer = potentialVictor;
        }
        match.activePlayerNumber = toggleActivePlayer(match.activePlayerNumber);
        return match;
    }

    export function undoLastMove(match: Match) {
        if (match.moves.length < 1) {
            console.log("no moves to undo");
            return match;
        }
        let lastMove: moves.Move = match.moves.pop();
        match.gameboard = boards.Helpers.applyMove(match.gameboard, lastMove.row, lastMove.column, 0);
        match.activePlayerNumber = toggleActivePlayer(match.activePlayerNumber);
        match.winningPlayer = -1;
        return match;
    }

    export function toggleActivePlayer(curPlayerNumber: number) {
        if (curPlayerNumber == 1)
            return 2;
        else
            return 1;
    }

    export function checkForVictory(match: Match) {
        let lastMove = match.moves[match.moves.length - 1];
        if (checkArrayForConnect4(boards.Helpers.getRow(match.gameboard, lastMove.row)) ||
            checkArrayForConnect4(boards.Helpers.getColumn(match.gameboard, lastMove.column)) ||
            checkArrayForConnect4(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, true)) ||
            checkArrayForConnect4(boards.Helpers.getDiagonal(match.gameboard, lastMove.row, lastMove.column, false))) {

            return lastMove.playerNumber;
        } else {
            return -1;
        }
    }

    export function checkArrayForConnect4(array: Array<number>) {
        let last = -1, streak = 1;
        for (let n of array) {
            if (n != 0 && n == last) {
                streak++;
                if (streak >= 4)
                    return true;
            } else {
                streak = 1;
            }
            last = n;
        }
        return false;
    }
}
