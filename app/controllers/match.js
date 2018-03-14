'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const matchModel = require("./../models/match");
function addMoveToMatch(req, res) {
    let match = matchModel.Helpers.addMove(req.body.match, +req.body.column);
    sendResponse(res, match);
}
exports.addMoveToMatch = addMoveToMatch;
function undoLastMove(req, res) {
    console.log('undoLastMove');
    let match = matchModel.Helpers.undoLastMove(req.body.match);
    sendResponse(res, match);
}
exports.undoLastMove = undoLastMove;
function sendResponse(res, match) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(match));
}
