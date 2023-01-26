import { clearAllTimers } from '../utils/clearAllTimers.js';

export const renderGameScreen = (cb) => {
    clearAllTimers(); // clear all timers                            

    const app = document.querySelector('.app');
    app.textContent = '';

    // Create title element and append it to app
    const title = document.createElement('h1');
    title.textContent = 'Game';
    app.appendChild(title);

    // Create content element and append it to app
    const content = document.createElement('div');
    content.classList.add('content');
    app.appendChild(content);

    window.application.renderBlock('gameBlock', content);
    window.application.renderBlock('gameBtn', content);

    cb();
}