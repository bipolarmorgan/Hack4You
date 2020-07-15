import { expiration } from '../config.js';
import { now } from 'microtime';
import { lang, returnMessage } from '../lang.js';
var lang = new lang();
var rlang = returnMessage;

class UserManager {
	constructor() {
		this.checkUserLogin = function (token, res, lang) {
			var user = global.loggedUsers.get(token);
			if (user != undefined) {
				if (res != undefined && global.loggedUsers.get(token).actions > expiration.actions) {
					global.loggedUsers.delete(token);
					return false;
				}
				if (now() < user.token_expiration) {
					global.loggedUsers.get(token).actions++;
					global.loggedUsers.get(token).minute_actions++;
					return true;
				}
				else if (user.minute_actions > expiration.minute_actions) {
					global.loggedUsers.delete(token);
					return false;
				}
				else {
					global.loggedUsers.delete(token);
					return false;
				}
			}
			else {
				return false;
			}
		};
	}
}

export default UserManager;
