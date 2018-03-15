// mcspross 2018

'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

import * as template from './views/basic-template'
import * as boards from './models/gameboard'
import * as matches from './models/match'
import * as matchController from './controllers/match'

let jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/move', jsonParser, function(req, res) {
    matchController.addMoveToMatch(req, res);
});

app.delete('/move', jsonParser, function(req, res) {
    matchController.undoLastMove(req, res);
});

app.get('/', (req, res) => matchController.getNewMatch(req, res))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
