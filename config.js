var config = {
	title: "Hack4You",
	main_url: '127.0.0.1:',
	port: 9304
};
config.expiration = {
	login: 1800000000,
	actions: 50,
	minute_actions: 5
}
config.tasks = {
	actions_check: 5000, //Default per minute - Value in milliseconds
	userlist_check: 10000 //Default every 30 minutes - Value in milliseconds
}
config.default_bonus = {
	money: 100,
	hcoins: 0
}
config.bot = {
	ip_ranges: [{initial: 100, final: 140}],
	tiers: [
		{
			bots: 100000,
			name: 'Tier 6',
			money_range: {
				initial: 10,
				final: 200
			},
			software_range: {
				initial: 1,
				final: 50
			}
		},
		{
			bots: 50000,
			name: 'Tier 5',
			money_range: {
				initial: 400,
				final: 1200
			},
			software_range: {
				initial: 50,
				final: 100
			}
		},
		{
			bots: 30000,
			name: 'Tier 4',
			money_range: {
				initial: 5000,
				final: 15000
			},
			software_range: {
				initial: 100,
				final: 200
			}
		},
		{
			bots: 10000,
			name: 'Tier 3',
			money_range: {
				initial: 30000,
				final: 50000
			},
			software_range: {
				initial: 200,
				final: 300
			}
		},
		{
			bots: 5000,
			name: 'Tier 2',
			money_range: {
				initial: 300000,
				final: 6000000
			},
			software_range: {
				initial: 500,
				final: 1000
			}
		},
		{
			bots: 5000,
			name: 'Tier 1',
			money_range: {
				initial: 15000000,
				final: 120000000
			},
			software_range: {
				initial: 1000,
				final: 4000
			}
		},
		{
			bots: 1000,
			name: 'Tier 0',
			money_range: {
				initial: 500000000,
				final: 3000000000
			},
			software_range: {
				initial: 10000,
				final: 30000
			}
		},
	]
}
config.mysql = {
	host: "127.0.0.1", 
	user: "hack4you",
	password: "hack4you",
	database: "hack4you"
};

config.email = {
	smtp: {
	    host: 'smtp.gmail.com',
	    port: 587,
	    secure: false, // upgrade later with STARTTLS
	    auth: {
	        user: 'test',
	        pass: 'test'
	    }
	},
	sender: {
		name: 'Hack4You',
		email: 'will.moraes.96@gmail.com'
	}
}

export default config;
