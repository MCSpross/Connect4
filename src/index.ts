// mcspross 2018

'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

import * as template from './views/basic-template'
import * as board from './models/gameboard'

let gameboard = board.Helpers.create(6, 7);
gameboard.grid = [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0,
    1, 0, 2, 0, 0, 0, 0,
    1, 2, 2, 1, 0, 0, 0
];
let jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/', urlencodedParser, function(req, res) {
    console.log(req.body);
    console.log(JSON.stringify(req.body.board));
    //process gameboard

    gameboard = JSON.parse(JSON.stringify(req.body.board));
    gameboard.grid[0] = 1;
    res.send(template.html(gameboard));
});
app.get('/', (req, res) => res.send(template.html(gameboard)))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
