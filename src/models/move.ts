export interface Move {
    playerNumber: number;
    row: number;
    column: number;
}

export namespace Helpers {
    export function create(playerNumber: number, row: number, column: number): Move {
        return { playerNumber: playerNumber, row: row, column: column };
    }
}
