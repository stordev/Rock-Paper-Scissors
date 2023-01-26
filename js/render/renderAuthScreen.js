export function renderAuthScreen(cb) {

    const app = document.querySelector('.app');
    app.textContent = '';

    // Create title element and append it to app
    const title = document.createElement('h1');
    title.textContent = 'Rock paper scissors';
    app.appendChild(title);

    // Create content element and append it to app
    const content = document.createElement('div');
    content.classList.add('content');
    app.appendChild(content);

    // Render auth block
    window.application.renderBlock('authBlock', content);

    cb();
}