'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const matches = require("./match");
const gameboards = require("./gameboard");
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
};
function makeMove(match) {
    let bestMove = evaluateMoveScores(match, 1);
    console.log(`Best Move: column ${bestMove.column}  score ${bestMove.score}`);
    return matches.Helpers.addMove(match, bestMove.column);
}
exports.makeMove = makeMove;
function evaluateMoveScores(match, searchIterations) {
    let streaks = [];
    for (let i = 0; i < match.gameboard.columns; i++) {
        let m = JSON.parse(JSON.stringify(match));
        streaks.push({ column: i, score: getScoreForColumnMove(m, i, m.activePlayerNumber, searchIterations) });
    }
    let bestScoringMoves = getBestScoringMoves(streaks);
    return bestScoringMoves[Math.floor(Math.random() * bestScoringMoves.length)];
}
exports.evaluateMoveScores = evaluateMoveScores;
function getBestScoringMoves(set) {
    set = sortArray(set, "score");
    console.log("getBestScoringMoves " + JSON.stringify(set));
    let bestScore = set[0].score, bestScoringMoves = [];
    bestScoringMoves.push(set[0]);
    for (let i = 1; i < set.length; i++) {
        if (set[i].score < bestScore) {
            break;
        }
        bestScoringMoves.push(set[i]);
    }
    return bestScoringMoves;
}
exports.getBestScoringMoves = getBestScoringMoves;
function getScoreForColumnMove(match, column, playeNumber, searchIterations) {
    let colStreak = 0;
    let interationScore = 0;
    if (gameboards.Helpers.getFirstOpenSlotInColumn(match.gameboard, column) != -1) {
        match = matches.Helpers.addMove(match, column);
        colStreak = matches.Helpers.checkForLongestStreak(match, playeNumber);
        if (searchIterations > 0) {
            searchIterations--;
            let bestMove = evaluateMoveScores(match, searchIterations);
            console.log("best move search " + bestMove);
            interationScore = (bestMove.score == 0) ? 0 : bestMove.score * -1;
            console.log(interationScore);
        }
    }
    return streakValuesDict[colStreak] + interationScore;
}
exports.getScoreForColumnMove = getScoreForColumnMove;
function sortArray(array, sortValue) {
    return array.sort(function (a, b) {
        return (b[sortValue] || 0) - (a[sortValue] || 0);
    });
}
exports.sortArray = sortArray;
