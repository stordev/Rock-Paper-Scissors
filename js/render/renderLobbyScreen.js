import { clearAllTimers } from '../utils/clearAllTimers.js';

export const renderLobbyScreen = (cb) => {

    clearAllTimers(); // clear all timers                            

    const app = document.querySelector('.app');
    app.textContent = '';

    // Create title element and append it to app
    const title = document.createElement('h1');
    title.textContent = 'Lobby';
    app.appendChild(title);

    // Create content element and append it to app
    const content = document.createElement('div');
    content.classList.add('content');
    app.appendChild(content);

    window.application.renderBlock('lobbyBlock', content); // render players block
    window.application.renderBlock('lobbyBtn', content); // render btn block

    cb();
}