import { bot as _bot } from '../config.js';
import { IpTools } from '../libs/ip_tools.js';
var generate_ip = new IpTools(_bot.ip_ranges).generate_ip;
MachineBotGenerator = function(){
	this.generateBots = function(){
		var machineBots = new Map();
		for (var tier of _bot.tiers) {
			for (var i = tier.bots - 1; i >= 0; i--) {
				var bot = {
					balance: valueGenerator(tier.money_range.initial, tier.money_range.final),
					firewall: valueGenerator(tier.software_range.initial, tier.software_range.final),
					scan: valueGenerator(tier.software_range.initial, tier.software_range.final),
					sdk: valueGenerator(tier.software_range.initial, tier.software_range.final),
					antivirus: valueGenerator(tier.software_range.initial, tier.software_range.final),
					proxy_tunel: valueGenerator(tier.software_range.initial, tier.software_range.final),
					spam: valueGenerator(tier.software_range.initial, tier.software_range.final),
					spyware: valueGenerator(tier.software_range.initial, tier.software_range.final)
				};
				var generated_ip = generate_ip();
				while(machineBots.has(generated_ip)){
					generated_ip = generate_ip();
				}
				////Debug
					if(tier.name == 'Tier 6' && i < 30){
						console.log(generated_ip);
					}
				////Debug
				machineBots.set(generated_ip, bot);
			}
		}
		var new_array = Array.from(machineBots);
		global.machineBots = machineBots;
	}
	function valueGenerator(initial, final){
		return (Math.floor(Math.random() * final) + initial);
	}
}
export default new MachineBotGenerator();