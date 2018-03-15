'use strict';

import * as matches from './match';
import * as gameboards from './gameboard';

const streakValuesDict = {
    1: 1,
    2: 100,
    3: 500,
    4: 1000,
    5: 1000,
    6: 1000,
    7: 1000
}

export function evaluateBestColumnForMoves(match: matches.Match) {
    let streaks = []
    for (let i = 0; i < match.gameboard.columns; i++) {
        let colStreak = -1;
        let m = JSON.parse(JSON.stringify(match));
        if (gameboards.Helpers.getFirstOpenSlotInColumn(m.gameboard, i) != -1) {
            let playeNum = m.activePlayerNumber;
            m = matches.Helpers.addMove(m, i);
            colStreak = matches.Helpers.checkForLongestStreak(m, playeNum);
        }
        console.log("score: " + streakValuesDict[colStreak]);
        streaks.push({ column: i, score: streakValuesDict[colStreak] });
    }
    streaks = sortArray(streaks, "score");
    let bestScore = streaks[0].score, bestScoringMoves = [];
    bestScoringMoves.push(streaks[0].column)
    for (let i = 1; i < streaks.length; i++) {
        if (streaks[i].score < bestScore) {
            break;
        }
        bestScoringMoves.push(streaks[i].column)
    }
    //if moves have equal score pick randomly from the set
    let bestColumnForMove = bestScoringMoves[Math.floor(Math.random() * bestScoringMoves.length)];
    return bestColumnForMove;
}

export function sortArray(array: Array<any>, sortValue: string) {
    return array.sort(function(a, b) {
        return (b[sortValue] || 0) - (a[sortValue] || 0);
    });
}
