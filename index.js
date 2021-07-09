const DISCORD = require('discord.js') 
const CLIENT = new DISCORD.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const PREFIX = "$"
const FS = require('fs')

CLIENT.commands = new DISCORD.Collection();
var commandFolders = FS.readdirSync(`./commands/`)
for(const FOLDER of commandFolders){
    const COMMAND_FILES = FS.readdirSync(`./commands/${FOLDER}`).filter(file => file.endsWith('.js'))
    for(const FILE of  COMMAND_FILES){
        const COMMAND = require(`./commands/${FOLDER}/${FILE}`);
        CLIENT.commands.set(COMMAND.name, COMMAND)
    }
}

CLIENT.once("ready", () => {
    console.log('AH_Bot online');
    console.log(CLIENT.commands);
})

CLIENT.on('guildMemberAdd', guildMember => {
    let role = guildMember.guild.roles.cache.find( role => role.name === 'Member')
    guildMember.roles.add(role)
    guildMember.guild.channels.cache.get('853540209589485571').send(`Welcome to AFTER HOURS, <@${guildMember.user.id}>!!\n Make sure to check out the <#853540209589485569> and pick some <#853540209589485574>`)
})


CLIENT.on('message', async message => {
    if(/(https:\/\/)?(discord.gg\/)+[a-zA-Z0-9]/.test(message.content) && !message.member.roles.cache.some(r => r.name.toLowerCase() === "owner" )){
        message.delete()    
        let embed = new DISCORD.MessageEmbed()
        .setColor('#FF8400')
        .setTitle('Warning: Invite Link')
        .setDescription(`<@${message.author.id}>, you do not have permission to send invite links.`)
        message.channel.send(embed)
        return;
    }

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const ARGS = message.content.slice(PREFIX.length).split(" ");
    const COMMAND = ARGS.shift().toLocaleLowerCase()

    if (!CLIENT.commands.has(COMMAND)) return;

	try {
		CLIENT.commands.get(COMMAND).execute(message, ARGS, CLIENT);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

})

CLIENT.login("ODYyMDcxMjg0MTIwMDI3MTY3.YOTAcg.3U-gT9M0tc0m1K3EQYMWKPpIK10");
