'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const matches = require("./match");
const gameboards = require("./gameboard");
function evaluateBestColumnForMoves(match) {
    let streaks = [];
    for (let i = 0; i < match.gameboard.columns; i++) {
        let colStreak = -1;
        let m = JSON.parse(JSON.stringify(match));
        if (gameboards.Helpers.getFirstOpenSlotInColumn(m.gameboard, i) != -1) {
            colStreak = matches.Helpers.checkForLongestStreak(matches.Helpers.addMove(m, i), m.activePlayerNumber);
        }
        streaks.push({ column: i, score: colStreak });
    }
    streaks = sortArray(streaks, "score");
    console.log("socrtedArray:" + JSON.stringify(streaks));
    let bestScore = streaks[0].score, bestScoringMoves = [];
    bestScoringMoves.push(streaks[0].column);
    for (let i = 1; i < streaks.length; i++) {
        if (streaks[i].score < bestScore) {
            break;
        }
        bestScoringMoves.push(streaks[i].column);
    }
    console.log("bestScoringMoves:" + JSON.stringify(bestScoringMoves));
    let bestColumnForMove = bestScoringMoves[Math.floor(Math.random() * bestScoringMoves.length)];
    return bestColumnForMove;
}
exports.evaluateBestColumnForMoves = evaluateBestColumnForMoves;
function sortArray(array, sortValue) {
    return array.sort(function (a, b) {
        return (b[sortValue] || 0) - (a[sortValue] || 0);
    });
}
exports.sortArray = sortArray;
