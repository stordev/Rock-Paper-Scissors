import { loginURL } from '../utils/urls.js';
import { requestData } from '../utils/requestData.js';

export function renderAuthBlock(container, cb) {
    container.textContent = '';

    const template = window.application.templates['auth-template'];
    if (!template) {
        // create an interval that will keep checking for the template to be defined
        window.application.timers['auth-template_timer'] = setInterval(() => {
            const template = window.application.templates['auth-template'];
            if (template) {
                // template is now defined, so clear the interval and continue rendering
                clearInterval(window.application.timers['auth-template_timer']);
                renderAuthBlock(container, cb);
            }
        }, 100);
        return;
    }

    container.append(template);

    const form = document.querySelector('.form');
    const userName = form.querySelector('#username');
    const submitBtn = form.querySelector('.submit-btn');
    userName.focus(); // focus on user name input    

    // disable submit button if input is empty
    userName.addEventListener('input', (event) => {
        submitBtn.disabled = (event.target.value.trim().length > 0) ? false : true;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default form submit        

        // send request to get token
        requestData({
            url: loginURL,
            params: {
                login: userName.value, // user name
            },
            callback: (data) => {
                window.application.userData['auth-token'] = data.token; // save token
                window.application.userData['userYou-login'] = userName.value; // save user name
                window.application.renderScreen('lobbyScreen'); // render screen                
            }
        }); // end requestData
    }); // end form submit

    cb(container);
} // close renderAuthBlock function
