const DISCORD = require('discord.js') 
const CLIENT = new DISCORD.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const PREFIX = "$"
const FS = require('fs')

CLIENT.commands = new DISCORD.Collection();
var COMMAND_FILES = FS.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
for(const FILE of COMMAND_FILES){
    const COMMAND = require(`./commands/${folder}/${FILE}`) || require(``);
    CLIENT.commands.set(COMMAND.name, COMMAND)
}

CLIENT.once("ready", () => {
    console.log('AH_Bot online');
    console.log(CLIENT.commands);
})

CLIENT.on('guildMemberAdd', guildMember => {
    let role = guildMember.guild.roles.cache.find( role => role.name === 'Member')
    guildMember.roles.add(role)
    guildMember.guild.channels.cache.get('853540209589485571').send(`Welcome to AFTER HOURS, <@${guildMember.user.id}>!! Make sure to check out the <#853540209589485569>`)
})


CLIENT.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const ARGS = message.content.slice(PREFIX.length).split(" ");
    const COMMAND = ARGS.shift().toLocaleLowerCase()

    if (!client.commands.has(COMMAND)) return;

	try {
		client.commands.get(COMMAND).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

})

CLIENT.login("ODYyMDcxMjg0MTIwMDI3MTY3.YOTAcg.3U-gT9M0tc0m1K3EQYMWKPpIK10");
