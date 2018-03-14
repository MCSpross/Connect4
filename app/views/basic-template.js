"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function html(board) {
    let content = `
    <style>
    .dot {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    </style>


    <br><br>
    <h2> Connect 4 </h2>
    <br>
    `;
    for (let i = 0; i < board.rows; i++) {
        for (let j = 0; j < board.columns; j++) {
            let dotPlayer = board.grid[(i * board.columns) + j];
            let color = '#bbb';
            if (dotPlayer == 1) {
                color = '#f00';
            }
            else if (dotPlayer == 2) {
                color = '#30f';
            }
            content += `<form style="padding: 1em; margin: 0.1em; display: inline-block;" method="post" action="/">
                           <input type="hidden" name="column" value={${j}}/>
                           <input type="hidden" name="board" value={${board}}/>
                           <button class="dot" style="background-color: ${color}" type="submit"></button>
                           <!-- Hidden fields -->

                        </form>`;
        }
        content += `<br>`;
    }
    return content;
}
exports.html = html;
