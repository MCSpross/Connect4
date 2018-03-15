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
        streaks.push({ column: i, streak: colStreak });
    }
    for (let s of streaks) {
    }
}
function sortArray(array, sortValue) {
    array.sort(function (a, b) {
        return (b[sortValue] || 0) - (a[sortValue] || 0);
    });
}
