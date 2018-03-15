import { assert, should, expect } from 'chai';

import * as board from './../../models/gameboard'
import * as moves from './../../models/move'
import * as match from './../../models/match'

describe('match helpers', function() {

    it('should catch vertical vistory conditions', function() {
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
        expect(match.Helpers.checkForVictory(testMatch)).to.equal(1);
    })

    it('should catch horizontal vistory conditions', function() {
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
        expect(match.Helpers.checkForVictory(testMatch)).to.equal(1);
    })

    it('should catch diagonal vistory conditions', function() {
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
        expect(match.Helpers.checkForVictory(testMatch)).to.equal(1);
    })

    it('should not evaluate false victory', function() {
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
        expect(match.Helpers.checkForVictory(testMatch)).to.equal(-1);
    })

    it('should allow moves change the gameboard', function() {
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
        expect(testMatch.gameboard.grid).to.deep.equal(targetGrid);
    })

    it('should allow moves to be undone', function() {
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
        expect(testMatch.gameboard.grid).to.deep.equal(originalGrid);
    })

    it('should count longest streak of connected dots', function() {
        let testMatch = match.Helpers.create(6, 7);
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 1, 1, 0, 0, 0, 0
        ];
        testMatch = match.Helpers.addMove(testMatch, 0);
        expect(match.Helpers.checkForLongestStreak(testMatch, 1)).to.equal(4);
    })

}
