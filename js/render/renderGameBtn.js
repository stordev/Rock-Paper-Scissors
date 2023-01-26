import { playURL } from '../utils/urls.js';
import { requestData } from '../utils/requestData.js';
import { getStatus } from '../utils/getStatus.js';

export function renderGameBtn(container, cb) {

    const template = window.application.templates['game-template'];
    container.appendChild(template.querySelector('.game__choice'));
    container.appendChild(template.querySelector('.game__exit'));

    // handle logout button
    const btnLogout = document.querySelector('.game__exit-logout');
    btnLogout.addEventListener('click', () => {
        location.reload(); // reload page to start over
    });

    const playerChoice = document.querySelector('.game__choice');
    const choiceBtns = document.querySelectorAll('.game__choice-btn');
    let infoStatus = document.querySelector('.game__info-status');
    const spinner = document.querySelector('.spinner');

    choiceBtns.forEach(button => {
        button.addEventListener('click', event => {

            choiceBtns.forEach(btn => btn.disabled = true);

            requestData({
                url: playURL,
                params: {
                    token: window.application.userData['auth-token'],
                    id: window.application.userData['user-id'],
                    move: event.target.id // 'rock', 'paper' or 'scissors'
                },
                callback: (data) => {
                    infoStatus.textContent = '';
                    spinner.classList.remove('hidden');

                    window.application.timers['waitOpponentMove_timer'] = setInterval(() => {
                        getStatus((data) => {
                            const gameStatus = data['game-status']['status'];
                            switch (gameStatus) {
                                case 'waiting-for-your-move':
                                    infoStatus.textContent = '🔄 Draw! Waiting for your move again...';
                                    choiceBtns.forEach(btn => btn.disabled = false);
                                    spinner.classList.add('hidden');
                                    clearInterval(window.application.timers['waitOpponentMove_timer']);
                                    break;
                                case 'waiting-for-enemy-move':
                                    infoStatus.textContent = 'Waiting for opponent move...';
                                    choiceBtns.forEach(btn => btn.disabled = true);
                                    spinner.classList.add('hidden');
                                    break;
                                case 'win':
                                    infoStatus.textContent = '🏆 You won!';
                                    playerChoice.remove();
                                    spinner.remove();
                                    clearInterval(window.application.timers['waitOpponentMove_timer']);
                                    break;
                                case 'lose':
                                    infoStatus.textContent = '🚫 You lost!';
                                    playerChoice.remove();
                                    spinner.remove();
                                    clearInterval(window.application.timers['waitOpponentMove_timer']);
                                    break;
                                default: console.log('Something went wrong');
                            }
                        });
                    }, 500);
                } // end callback function in requestData
            }); // end requestData
        }); // end addEventListener
    }); // end forEach

    cb();
}
