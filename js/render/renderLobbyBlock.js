import { playListURL } from '../utils/urls.js';
import { requestData } from '../utils/requestData.js';

class Players {
    constructor(container) {
        this.remainingTime = 600; // seconds
        this.playersRendered = false;
        this.players = window.application.templates['lobby-template'];
        this.container = container;
        this.token = window.application.userData['auth-token'];
        this.currentYouPlayer = null;
        this.intervalId = null;
    }

    startRendering() {
        if (!this.playersRendered) {
            this.playersRendered = true;
            this.render();
        } // else do nothing

        window.application.timers['players_timer'] = setInterval(() => {
            this.render(); // render players
        }, 2000); // render every 2 seconds        

        setTimeout(() => { // reload page after 10 minutes
            this.stopRendering();
            location.reload(); // reload page to start over
        }, this.remainingTime * 1000);
    }

    stopRendering() {
        clearInterval(window.application.timers['players_timer']);
    }

    render() {
        requestData({
            url: `${playListURL}`,
            params: {
                token: this.token
            },
            callback: (data) => {
                if (window.application.players === data.list) {
                    return; // do not update if nothing changed
                }
                window.application.players = data.list;
                this.fillPlayers();
            }
        });
    }

    fillPlayers() {
        this.container.insertBefore(this.players, this.container.firstChild);

        const players = this.container.querySelector('.players__body');
        const playerItem = players.querySelector('.players__item');
        players.textContent = '';

        window.application.players.forEach((player) => {
            if (player.login === window.application.login) {
                player.you = true;
            }

            const clone = playerItem.cloneNode(true);
            const userName = clone.querySelector('.login');
            userName.textContent = player.login;


            if (player.you) {
                if (this.currentYouPlayer) {
                    this.currentYouPlayer.classList.remove('you');
                }
                this.currentYouPlayer = userName;
                userName.classList.add('you');
            }

            clone.querySelector('.loses').textContent = player.loses;
            clone.querySelector('.papers').textContent = player.papers;
            clone.querySelector('.rocks').textContent = player.rocks;
            clone.querySelector('.scissors').textContent = player.scissors;
            clone.querySelector('.wins').textContent = player.wins;
            players.appendChild(clone);
        });
    }
}

export function renderLobbyBlock(container, callback) {
    const players = new Players(container);
    players.startRendering();
    callback();
}

