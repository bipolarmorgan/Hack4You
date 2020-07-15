import { tasks } from '../config.js';
import { now } from 'microtime';

class UserlistCleaner {
	constructor() {
		var checkTask;
		var userlistCheck = function () {
			console.log('User cleaner started.. By UserlistCheck');
			for (var user of global.loggedUsers.values()) {
				if (now() > user.token_expiration) {
					global.loggedUsers.delete(user.token);
				}
			}
		};
		this.startTask = function () {
			checkTask = setInterval(userlistCheck, tasks.userlist_check);
		};
	}
}
export default new UserlistCleaner();