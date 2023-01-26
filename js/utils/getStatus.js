import { gameStatusURL } from '../utils/urls.js';
import { requestData } from '../utils/requestData.js';

export const getStatus = (cb) => {
    const token = window.application.userData['auth-token']
    const id = window.application.userData['user-id']
    requestData({
        url: gameStatusURL,
        params: { token, id },
        callback: data => {
            cb(data);
        }
    });
};
