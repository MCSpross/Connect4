"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers;
(function (Helpers) {
    function create(rows, columns) {
        let grid = Array.from({ length: columns * rows }, x => 0);
        return { rows: rows, columns: columns, grid: grid };
    }
    Helpers.create = create;
    function getValue(board, row, col) {
        return board.grid[getIndex(board, row, col)];
    }
    Helpers.getValue = getValue;
    function getIndex(board, row, col) {
        return (((board.rows - 1) - row) * board.columns) + col;
    }
    Helpers.getIndex = getIndex;
    function applyMove(board, row, col, playerNumber) {
        board.grid[getIndex(board, row, col)] = playerNumber;
        return board;
    }
    Helpers.applyMove = applyMove;
    function getRow(board, row) {
        let rowValues = [];
        let col = 0;
        while (col < board.columns) {
            rowValues.push(getValue(board, row, col));
            col++;
        }
        return rowValues;
    }
    Helpers.getRow = getRow;
    function getColumn(board, col) {
        let colValues = [];
        let row = 0;
        while (row < board.rows) {
            colValues.push(getValue(board, row, col));
            row++;
        }
        return colValues;
    }
    Helpers.getColumn = getColumn;
    function getDiagonal(board, row, col, rightHanded) {
        let diagonalDirection = rightHanded ? 1 : -1;
        while (row < board.rows - 1) {
            let newCol = col + diagonalDirection;
            if (newCol > board.columns - 1 || newCol < 0) {
                break;
            }
            row++;
            col = newCol;
        }
        let diagonalValues = [];
        while (row >= 0) {
            diagonalValues.push(getValue(board, row, col));
            col -= diagonalDirection;
            if (col < 0 || col >= board.columns) {
                break;
            }
            row--;
        }
        return diagonalValues;
    }
    Helpers.getDiagonal = getDiagonal;
    function getFirstOpenSlotInColumn(board, col) {
        let row = 0;
        while (row < board.rows) {
            if (getValue(board, row, col) == 0) {
                break;
            }
            row++;
        }
        return row;
    }
    Helpers.getFirstOpenSlotInColumn = getFirstOpenSlotInColumn;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
