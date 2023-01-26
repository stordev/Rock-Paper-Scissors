export function renderGameBlock(container, cb) {

    container.textContent = '';

    console.log(window.application.templates);
    const template = window.application.templates['game-template'];
    container.appendChild(template.querySelector('.game__rivals'));
    container.appendChild(template.querySelector('.game__info'));

    const loginYou = document.querySelector('.game__rivals-you');
    loginYou.textContent = window.application.userData['userYou-login'];
    const loginOpponent = document.querySelector('.game__rivals-opponent');
    loginOpponent.textContent = window.application.userData['opponent-login'];

    cb();
}