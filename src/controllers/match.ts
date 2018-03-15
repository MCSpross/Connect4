'use strict';

import * as matchModel from './../models/match'
import * as template from './../views/basic-template'
import * as AI from './../models/AI'


export function renderTemplateAndNewMatch(req, res) {
    let match = matchModel.Helpers.create(6, 7);
    res.setHeader('Content-Type', 'text/html');
    res.send(template.html(match));
}

export function getNewMatch(req, res) {
    let match = matchModel.Helpers.create(6, 7);
    sendResponse(res, match);
}

export function addMoveToMatch(req, res) {
    let match = matchModel.Helpers.addMove(req.body.match, +req.body.column);
    match = AI.makeMove(match);
    sendResponse(res, match);
}

export function undoLastMove(req, res) {
    console.log('undoLastMove');
    //do it twice now that there is an AI move
    let match = matchModel.Helpers.undoLastMove(req.body.match);
    match = matchModel.Helpers.undoLastMove(match);

    sendResponse(res, match);
}

function sendResponse(res, match: matchModel.Match) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(match));
}
