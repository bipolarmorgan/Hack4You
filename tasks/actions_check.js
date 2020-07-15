import { expiration, tasks } from '../config.js';
import { microtime } from 'microtime';

class ActionsCheck {
    constructor() {
        var checkTask;
        var userlistCheck = function () {
            console.log('User cleaner started.. By ActionsCheck');
            for (var user of global.loggedUsers.values()) {
                if (user.minute_actions > expiration.minute_actions) {
                    global.loggedUsers.delete(user.token);
                    console.log('User with token: ' + user.token + ' has been disconnected.. by ActionsCheck with reason: Max Minute Actions');
                }
                else {
                    global.loggedUsers.get(user.token).minute_actions = 0;
                }
            }
        };
        this.startTask = function () {
            checkTask = setInterval(userlistCheck, tasks.actions_check);
        };
    }
}
export default new ActionsCheck();