// mcspross 2018

'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

import * as template from './views/basic-template'
import * as boards from './models/gameboard'
import * as matches from './models/match'
import * as matchController from './controllers/match'

let match = matches.Helpers.create(6, 7);
match.gameboard.grid = [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0,
    1, 0, 2, 0, 0, 0, 0,
    1, 2, 2, 1, 0, 0, 0
];
let jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/move', jsonParser, function(req, res) {
    matchController.addMoveToMatch(req, res);
});

app.delete('/move', jsonParser, function(req, res) {
    matchController.undoLastMove(req, res);
});

app.get('/', (req, res) => res.send(template.html(match)))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
