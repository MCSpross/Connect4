'use strict';

import * as matches from './match';
import * as gameboards from './gameboard';

const streakValuesDict = {
    0: -100000,
    1: 0,
    2: 0,
    3: 500,
    4: 1000,
    5: 1000,
    6: 1000,
    7: 1000,
    8: 1000
}

export function makeMove(match: matches.Match) {
    let bestMove = evaluateMoveScores(match, 1);
    //console.log(`Best Move: column ${bestMove.column}  score ${bestMove.score}`)
    return matches.Helpers.addMove(match, bestMove.column);
}

export function evaluateMoveScores(match: matches.Match, searchIterations: number) {
    let streaks = []
    for (let i = 0; i < match.gameboard.columns; i++) {
        let m = JSON.parse(JSON.stringify(match));
        streaks.push({ column: i, score: getScoreForColumnMove(m, i, m.activePlayerNumber, searchIterations) });
    }

    let bestScoringMoves = getBestScoringMoves(streaks);
    //if moves have equal score pick randomly from the set
    return bestScoringMoves[Math.floor(Math.random() * bestScoringMoves.length)];
}

export function getBestScoringMoves(set: Array<any>) {
    set = sortArray(set, "score");
    //console.log("getBestScoringMoves " + JSON.stringify(set));
    let bestScore = set[0].score, bestScoringMoves = [];
    bestScoringMoves.push(set[0])
    for (let i = 1; i < set.length; i++) {
        if (set[i].score < bestScore) {
            break;
        }
        bestScoringMoves.push(set[i])
    }
    return bestScoringMoves;
}

export function getScoreForColumnMove(match: matches.Match, column: number, playeNumber: number, searchIterations: number) {
    let colStreak = 0;
    let interationScore = 0;
    if (gameboards.Helpers.getFirstOpenSlotInColumn(match.gameboard, column) != -1) {
        match = matches.Helpers.addMove(match, column);
        colStreak = matches.Helpers.checkForLongestStreak(match, playeNumber);
        if (searchIterations > 0) {
            searchIterations--;
            let bestMove = evaluateMoveScores(match, searchIterations)
            interationScore = (bestMove.score == 0) ? 0 : bestMove.score * -1;
        }
    }
    return streakValuesDict[colStreak] + interationScore;
}

export function sortArray(array: Array<any>, sortValue: string) {
    return array.sort(function(a, b) {
        return (b[sortValue] || 0) - (a[sortValue] || 0);
    });
}
