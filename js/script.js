import { fetchContent } from './utils/fetchContent.js';
import { renderAuthScreen } from './render/renderAuthScreen.js';
import { renderAuthBlock } from './render/renderAuthBlock.js';
import { renderLobbyScreen } from './render/renderLobbyScreen.js';
import { renderLobbyBlock } from './render/renderLobbyBlock.js';
import { renderLobbyBtn } from './render/renderLobbyBtn.js';
import { renderGameScreen } from './render/renderGameScreen.js';
import { renderGameBlock } from './render/renderGameBlock.js';
import { renderGameBtn } from './render/renderGameBtn.js';


// global application object
window.application = {
    userData: {}, // store user data (login, token, id, etc.)
    players: [], // store players statistics
    templates: {}, // store templates
    blocks: {}, // store blocks
    screens: {}, // store screens
    timers: [], // store timers

    getTemplate: function (templateName, classSelector) {
        fetchContent(`templates/${templateName}.html`, classSelector, (contentBlock) => {
            window.application.templates[templateName] = contentBlock;
            output(templateName, contentBlock);
        });
    },

    // render block function
    renderBlock: function (blockName, container) {
        window.application.blocks[blockName](container, (data) => output(blockName));
    },
    // render screen function
    renderScreen: function (screenName) {
        window.application.screens[screenName]((data) => output(screenName, data));
    }

};

const output = (name, data) => {
    name.includes('template')
        ? console.log(`# ${name} loaded`)
        : console.log(`## ${name} rendered`);
    if (data) {
        console.log(data);
    }
}


// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // init templates
    window.application.getTemplate('auth-template', '.form');
    window.application.getTemplate('lobby-template', '.players');
    window.application.getTemplate('game-template', '.game');

    // register blocks
    window.application.blocks['authBlock'] = renderAuthBlock;
    window.application.blocks['lobbyBlock'] = renderLobbyBlock;
    window.application.blocks['lobbyBtn'] = renderLobbyBtn;
    window.application.blocks['gameBlock'] = renderGameBlock;
    window.application.blocks['gameBtn'] = renderGameBtn;

    // register screen
    window.application.screens['authScreen'] = renderAuthScreen;
    window.application.screens['lobbyScreen'] = renderLobbyScreen;
    window.application.screens['gameScreen'] = renderGameScreen;

    // renderings
    window.application.renderScreen('authScreen'); // render screen
});