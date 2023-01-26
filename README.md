# API

url: https://skypro-rock-scissors-paper.herokuapp.com

 0. GET /ping

 1. GET /player-list
params: token

 2. GET /start
params: token
Response: id

 3. GET /player-status
params: token
Response: lobby / ok / error

 4. GET /game-status
params: token, id
Response: waiting-for-start / -your-move (draw) / -enemy-move / lose / win 

 5. GET /play
params: token, id, move (rock, scissors, paper)
