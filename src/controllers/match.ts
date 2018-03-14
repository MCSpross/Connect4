'use strict';

import * as matchModel from './../models/match'

export function addMoveToMatch(req, res) {
    let match = matchModel.Helpers.addMove(req.body.match, +req.body.column);
    sendResponse(res, match);
}

export function undoLastMove(req, res) {
    console.log('undoLastMove');
    let match = matchModel.Helpers.undoLastMove(req.body.match);
    sendResponse(res, match);
}

function sendResponse(res, match: matchModel.Match) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(match));
}
