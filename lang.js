class lang {
	constructor() {
		var langs = new Array();
		//Add languages
		langs.push(new require('./languages/en.js'));

		this.returnMessage = function (lang, code) {
			for (language of langs) {
				if (language.name == lang) {
					for (message of language.messages) {
						if (message.code == code) {
							return message;
						}
					}
					return false;
				}
			}
			return false;
		};
		this.returnMail = function (lang, code) {
			for (language of langs) {
				if (language.name == lang) {
					for (mail of language.mails) {
						if (mail.code == code) {
							return mail.body;
						}
					}
					return false;
				}
			}
			return false;
		};
	}
}

export default lang;