"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const match = require("./../../models/match");
describe('match helpers', function () {
    it('should catch vertical vistory conditions', function () {
        let testMatch = match.Helpers.create(6, 7);
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0
        ];
        testMatch = match.Helpers.addMove(testMatch, 0);
        chai_1.expect(match.Helpers.checkForVictory(testMatch)).to.equal(1);
    });
    it('should catch horizontal vistory conditions', function () {
        let testMatch = match.Helpers.create(6, 7);
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 0, 0, 0
        ];
        testMatch = match.Helpers.addMove(testMatch, 0);
        chai_1.expect(match.Helpers.checkForVictory(testMatch)).to.equal(1);
    });
    it('should catch diagonal vistory conditions', function () {
        let testMatch = match.Helpers.create(6, 7);
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ];
        testMatch = match.Helpers.addMove(testMatch, 0);
        chai_1.expect(match.Helpers.checkForVictory(testMatch)).to.equal(1);
    });
    it('should not evaluate false victory', function () {
        let testMatch = match.Helpers.create(6, 7);
        testMatch.gameboard.grid = [
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 1, 0, 1
        ];
        testMatch = match.Helpers.addMove(testMatch, 3);
        chai_1.expect(match.Helpers.checkForVictory(testMatch)).to.equal(-1);
    });
    it('should allow moves change the gameboard', function () {
        let testMatch = match.Helpers.create(6, 7);
        let targetGrid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0
        ];
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ];
        testMatch = match.Helpers.addMove(testMatch, 0);
        chai_1.expect(testMatch.gameboard.grid).to.deep.equal(targetGrid);
    });
    it('should allow moves to be undone', function () {
        let testMatch = match.Helpers.create(6, 7);
        let originalGrid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ];
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ];
        testMatch = match.Helpers.addMove(testMatch, 0);
        testMatch = match.Helpers.undoLastMove(testMatch);
        chai_1.expect(testMatch.gameboard.grid).to.deep.equal(originalGrid);
    });
});
