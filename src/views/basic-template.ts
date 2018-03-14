import { Gameboard } from './../models/gameboard'
import { Match } from './../models/match'

export function html(match: Match) {
    let content = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Connect 4</title>
      <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    </head>
    <body>
    <style>
    .dot {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      padding: 1em;
      margin: 0.1em;
      display: inline-block;
    }
    </style>


    <br><br>
    <h2> Connect 4 </h2>
    <br>
    `
    for (let i = 0; i < match.gameboard.rows; i++) {
        for (let j = 0; j < match.gameboard.columns; j++) {
            let dotPlayer = match.gameboard.grid[(i * match.gameboard.columns) + j];
            let color = '#bbb';
            if (dotPlayer == 1) {
                color = '#f00'
            } else if (dotPlayer == 2) {
                color = '#30f'
            }
            content += `<button class="dot" id="${(i * match.gameboard.columns) + j}" style="background-color: ${color}" type="submit" value="${j}"></button>`
        }
        content += `<br>`
    }

    content += `
    <button class="undo" type="submit">Undo Last Move</button>

    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>

    <script>
    var match = ${JSON.stringify(match)};

    function Redraw(data){
      match = data;
      console.log("Result:"+ JSON.stringify(data));
      for(var i = 0; i< match.gameboard.grid.length; i++){
        var dotPlayer = match.gameboard.grid[i];
        let color = '#bbb';
        if (dotPlayer == 1) {
            color = '#f00'
        } else if (dotPlayer == 2) {
            color = '#30f'
        }
        $("#"+i).css("background-color", color)
      }
    }

    $( ".dot" ).click( function(){
      var v = $(this).attr('value');
      console.log("column "+v);
      $.ajax({
          url: '/move',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ match: match, column:v }),
          success: Redraw
      })
    });

    $(".undo").click( function(){
      $.ajax({
          url: '/move',
          type: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify({ match: match }),
          success: Redraw
      })
    })


    </script>

    </body>
    </html>
    `

    return content;
}
