import { clearAllTimers } from '../utils/clearAllTimers.js';
import { requestData } from '../utils/requestData.js';
import { startURL } from '../utils/urls.js';
import { playerStatusURL } from '../utils/urls.js';
import { getStatus } from '../utils/getStatus.js';


export function renderLobbyBtn(container, cb) {

    const btnBlock = document.createElement('div');
    btnBlock.classList.add('btnBlock');

    const btnStart = document.createElement('button');
    btnStart.classList.add('btn');
    btnStart.textContent = 'Start game';

    btnBlock.appendChild(btnStart); // Append button to div
    container.appendChild(btnBlock); // Append div to container

    // log out button    
    const btnLogout = document.createElement('button');
    btnLogout.classList.add('btn');
    btnLogout.textContent = 'Log out';

    btnBlock.appendChild(btnLogout); // Append button to div
    container.appendChild(btnBlock); // Append div to container

    let statusText = document.createElement('p');
    statusText.textContent = 'Loading...';
    statusText.classList.add('hidden');
    container.appendChild(statusText);

    btnLogout.addEventListener('click', () => {
        location.reload(); // reload page to start over
    });

    // start game button event listener
    btnStart.addEventListener('click', () => {
        btnStart.disabled = true; // disable button                
        statusText.classList.remove('hidden'); // show status text

        const authToken = window.application.userData['auth-token'];

        startGame(authToken, (userId) => {
            window.application.userData['user-id'] = userId; // save user id 

            window.application.timers['waitOpponent_timer'] = setInterval(() => {
                getStatus((data) => {
                    if (data === null) {
                        clearInterval(window.application.timers['waitOpponent_timer']);
                        clearAllTimers();
                        statusText.textContent = 'Servre error. Please try again with another login.';
                        return;
                    }

                    let gameStatus = data['game-status']['status']
                    if (gameStatus === 'waiting-for-start') {
                        statusText.textContent = 'Waiting for opponent...';
                        return;
                    }

                    if (gameStatus === 'waiting-for-your-move' || gameStatus === 'waiting-for-enemy-move') {
                        clearAllTimers();
                        //clearInterval(window.application.timers['waitOpponent_timer']);
                        const opponentLogin = data['game-status']['enemy']['login']; // get opponent login
                        window.application.userData['opponent-login'] = opponentLogin
                        window.application.renderScreen('gameScreen');
                        return;
                    }
                });
            }, 1000);
        });
    }); // end btnStart event listener    
    cb();
};


const startGame = (authToken, cb) => {
    requestData({
        url: startURL, params: { token: authToken },
        callback: data => {
            if (data.status === 'ok') { // if game is started
                cb(data['player-status']['game']['id']); // get new id
            } else { // if game is not started yet
                getPlayerId(authToken, (currentId) => {
                    cb(currentId); // get current id
                });
            }
        }
    });
};

const getPlayerId = (authToken, cb) => {
    requestData({
        url: playerStatusURL,
        params: { token: authToken },
        callback: data => {
            if (data) { // if data is received
                const id = data['player-status']['game']['id'];
                window.application.userData['user-id'] = id;
                cb(id);
            }
        }
    });
};
