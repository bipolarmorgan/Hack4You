import { createTransport } from 'nodemailer';
import { email as _email } from '../config.js';
var email = _email;

class MailSender {
	constructor() {
		var transporter = createTransport(_email.smtp);
		var sender = email.sender;

		this.sendMail = function (to, body) {
			var mailOptions = {
				from: '"' + sender.name + '" <' + sender.email + '>',
				to: to,
				subject: body.subject,
				html: body.content // html body
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}
				else {
					console.log('Message %s sent: %s', info.messageId, info.response);
				}
			});
		};
	}
}


export default MailSender;