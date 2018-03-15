import { assert, should, expect } from 'chai';

import * as AI from './../../models/AI';
import * as match from './../../models/match';

describe('AI helpers', function() {
    it('should sort potential move scores in the correct order', function() {
        let unsortedArray = [
            { column: 0, streak: 1 },
            { column: 1, streak: 4 },
            { column: 2, streak: 3 },
            { column: 3, streak: 2 },
            { column: 4, streak: 3 },
            { column: 5, streak: 1 }
        ]

        let correctlySortedArray = [
            { column: 1, streak: 4 },
            { column: 2, streak: 3 },
            { column: 4, streak: 3 },
            { column: 3, streak: 2 },
            { column: 0, streak: 1 },
            { column: 5, streak: 1 }
        ]

        expect(AI.sortArray(unsortedArray, "streak")).to.deep.equal(correctlySortedArray)
    });

    it('should make the move to connect the most dots possible', function() {
        let testMatch = match.Helpers.create(6, 7);
        testMatch.gameboard.grid = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 0, 0, 0,
            1, 1, 0, 0, 1, 1, 1
        ];
        expect(AI.evaluateBestColumnForMoves(testMatch)).to.equal(3);
    })
});
