import { Gameboard } from './gameboard';
import { Move } from './move';

export interface Match {
    playerOneId: string;
    playerTwoId: string;
    gameboard: Gameboard;
    moves: Array<Move>;
}
