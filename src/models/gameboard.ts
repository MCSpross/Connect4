export interface Gameboard {
    rows: number;
    columns: number;
    grid: Array<number>;
}

// Grid looks like
// [
//     0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0,
//     0, 1, 0, 0, 0, 0, 0,
//     1, 2, 2, 2, 1, 0, 0   <= row 0
// ]   ^= column 0

export namespace Helpers {
    export function create(rows: number, columns: number): Gameboard {
        let grid = Array.from({ length: columns * rows }, x => 0)
        return { rows: rows, columns: columns, grid: grid }
    }

    export function getValue(board: Gameboard, row: number, col: number) {
        return board.grid[getIndex(board, row, col)];
    }

    export function getIndex(board: Gameboard, row: number, col: number) {
        return (((board.rows - 1) - row) * board.columns) + col;
    }

    export function getRow(board: Gameboard, row: number) {
        let rowValues = [];
        let col = 0;
        while (col < board.columns) {
            rowValues.push(
                getValue(board, row, col)
            );
            col++;
        }
        return rowValues;
    }

    export function getColumn(board: Gameboard, col: number) {
        let colValues = [];
        let row = 0;
        while (row < board.rows) {
            colValues.push(
                getValue(board, row, col)
            );
            row++;
        }
        return colValues;
    }

    export function getDiagonal(board: Gameboard, row: number, col: number, rightHanded: boolean) {
        // gb.grid = [
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 1, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0
        // ]
        //r =3, c = 4
        //r =4, c = 3
        //r =5, c = 2
        //r =6? invalid, start diagonal
        //r =5, c = 2
        //r =4, c = 3
        //r =3, c = 4
        //r =2, c = 5
        //r=1, c=6
        //r=0, c=7? invalid, return array
        let diagonalDirection = rightHanded ? 1 : -1;
        //get starting coordinate
        while (row < board.rows - 1) {
            let newCol = col + diagonalDirection;
            if (newCol > board.columns - 1 || newCol < 0) {
                break;
            }
            row++;
            col = newCol;
        }
        //populate diagonal values now that we have a starting point
        let diagonalValues = [];
        while (row >= 0) {
            diagonalValues.push(
                getValue(board, row, col)
            );
            col -= diagonalDirection;
            if (col < 0 || col >= board.columns) {
                break;
            }
            row--;
        }
        return diagonalValues;
    }

    export function getFirstOpenSlotInColumn(board: Gameboard, col: number) {
        let index: number = -1;
        let row = 0;
        while (row < board.rows) {
            if (getValue(board, row, col) == 0) {
                index = getIndex(board, row, col);
                break;
            }
            row++;
        }
        return index;
    }
}
