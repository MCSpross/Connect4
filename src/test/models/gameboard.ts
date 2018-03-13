
import { assert, should, expect } from 'chai';

import * as board from './../../models/gameboard'

describe('gameboard helpers', function() {
    let gb: board.Gameboard = board.Helpers.create(6, 7);
    it('should create an empty gameboard', function() {
        let testGrid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ];
        //console.log(a);
        expect(testGrid).to.deep.equal(gb.grid)
    });

    it('should get the correct index of the top right corner of the gameboard', function() {
        expect(board.Helpers.getIndex(gb, 5, 6)).to.equal(6);
    })

    it('should get the correct index of the bottom right corner of the gameboard', function() {
        expect(board.Helpers.getIndex(gb, 0, 6)).to.equal(41);
    })

    it('should return the correct value of a row and column coordinate', function() {
        gb.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 0, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 1, 0, 0
        ]
        let gridValue: number = board.Helpers.getValue(gb, 2, 4);
        expect(gridValue).to.equal(2);
    })

    it('should return the next open index in a column', function() {
        gb.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0
        ]
        let openIndex: number = board.Helpers.getFirstOpenSlotInColumn(gb, 2);
        expect(openIndex).to.equal(9);
    })


    it('should get the values of the specified row', function() {
        gb.grid = [
            0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 8, 7, 6, 5,
            4, 3, 2, 1, 0, 1, 2,
            3, 4, 5, 6, 7, 8, 9,
            8, 7, 6, 5, 4, 3, 2,
            1, 0, 1, 2, 3, 4, 5
        ];
        let rowVal = board.Helpers.getRow(gb, 3);
        expect(rowVal).to.deep.equal([4, 3, 2, 1, 0, 1, 2]);
    })

    it('should get the values of the specified column', function() {
        gb.grid = [
            0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 8, 7, 6, 5,
            4, 3, 2, 1, 0, 1, 2,
            3, 4, 5, 6, 7, 8, 9,
            8, 7, 6, 5, 4, 3, 2,
            1, 0, 1, 2, 3, 4, 5
        ];
        let colVal = board.Helpers.getColumn(gb, 2);
        expect(colVal).to.deep.equal([1, 6, 5, 2, 9, 2]);
    })

    it('should get the values of the specified right-handed diagonal', function() {
        gb.grid = [
            0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 8, 7, 6, 5,
            4, 3, 2, 1, 0, 1, 2,
            3, 4, 5, 6, 7, 8, 9,
            8, 7, 6, 5, 4, 3, 2,
            1, 0, 1, 2, 3, 4, 5
        ];
        let colVal1 = board.Helpers.getDiagonal(gb, 3, 4, true);
        let colVal2 = board.Helpers.getDiagonal(gb, 0, 4, true);
        let colVal3 = board.Helpers.getDiagonal(gb, 3, 0, true);
        let colVal4 = board.Helpers.getDiagonal(gb, 5, 4, true);
        let colVal5 = board.Helpers.getDiagonal(gb, 3, 6, true);
        expect(colVal1).to.deep.equal([6, 6, 0, 6, 6, 0]);
        expect(colVal2).to.deep.equal([9, 3, 3]);
        expect(colVal3).to.deep.equal([2, 8, 4]);
        expect(colVal4).to.deep.equal([4, 8, 2, 4, 8]);
        expect(colVal5).to.deep.equal([2, 8, 4, 2]);
    })

    it('should get the values of the specified left-handed diagonal', function() {
        gb.grid = [
            0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 8, 7, 6, 5,
            4, 3, 2, 1, 0, 1, 2,
            3, 4, 5, 6, 7, 8, 9,
            8, 7, 6, 5, 4, 3, 2,
            1, 0, 1, 2, 3, 4, 5
        ];
        let colVal1 = board.Helpers.getDiagonal(gb, 3, 4, false);
        let colVal2 = board.Helpers.getDiagonal(gb, 0, 4, false);
        let colVal3 = board.Helpers.getDiagonal(gb, 3, 0, false);
        let colVal4 = board.Helpers.getDiagonal(gb, 5, 4, false);
        let colVal5 = board.Helpers.getDiagonal(gb, 2, 6, false);
        expect(colVal1).to.deep.equal([2, 8, 0, 8, 2]);
        expect(colVal2).to.deep.equal([7, 3, 5, 5, 3]);
        expect(colVal3).to.deep.equal([4, 4, 6, 2]);
        expect(colVal4).to.deep.equal([4, 6, 2]);
        expect(colVal5).to.deep.equal([3, 7, 1, 9]);
    })
});
