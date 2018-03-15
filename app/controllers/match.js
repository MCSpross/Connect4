'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const matchModel = require("./../models/match");
const template = require("./../views/basic-template");
const AI = require("./../models/AI");
function renderTemplateAndNewMatch(req, res) {
    let match = matchModel.Helpers.create(6, 7);
    res.setHeader('Content-Type', 'text/html');
    res.send(template.html(match));
}
exports.renderTemplateAndNewMatch = renderTemplateAndNewMatch;
function getNewMatch(req, res) {
    let match = matchModel.Helpers.create(6, 7);
    sendResponse(res, match);
}
exports.getNewMatch = getNewMatch;
function addMoveToMatch(req, res) {
    let match = matchModel.Helpers.addMove(req.body.match, +req.body.column);
    match = AI.makeMove(match);
    sendResponse(res, match);
}
exports.addMoveToMatch = addMoveToMatch;
function undoLastMove(req, res) {
    console.log('undoLastMove');
    let match = matchModel.Helpers.undoLastMove(req.body.match);
    match = matchModel.Helpers.undoLastMove(match);
    sendResponse(res, match);
}
exports.undoLastMove = undoLastMove;
function sendResponse(res, match) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(match));
}
