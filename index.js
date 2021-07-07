const DISCORD = require('discord.js') 
const CLIENT = new DISCORD.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const PREFIX = "$"
const FS = require('fs')

CLIENT.commands = new DISCORD.Collection();
const COMMAND_FILES = FS.readdirSync('./moderation/').filter(file => file.endsWith('.js'))
for(const FILE of COMMAND_FILES){
    const COMMAND = require(`./moderation/${FILE}`);
    CLIENT.commands.set(COMMAND.name, COMMAND)
}

CLIENT.once("ready", () => {
    console.log('AH_Bot online');
})

CLIENT.on('guildMemberAdd', guildMember => {
    let role = guildMember.guild.roles.cache.find( role => role.name === 'Member')
    guildMember.roles.add(role)
    guildMember.guild.channels.cache.get('853540209589485571').send(`Welcome to AFTER HOURS, <@${guildMember.user.id}>!! Make sure to check out the rules`)
})
console.log(CLIENT.commands);

CLIENT.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const ARGS = message.content.slice(PREFIX.length).split(" ");
    const COMMAND = ARGS.shift().toLocaleLowerCase()

    switch(COMMAND){
        case "sup":
            CLIENT.commands.get('ping').execute(message, ARGS)
            break;
        case "kick":
            CLIENT.commands.get('kick').execute(message, ARGS)
            break;
        case "ban":
            CLIENT.commands.get('ban').execute(message, ARGS)
            break;
        case "clear":
            CLIENT.commands.get('clear').execute(message, ARGS)
            break;
        case "mute":
            CLIENT.commands.get('mute').execute(message, ARGS)
            break;
        case "unmute":
            CLIENT.commands.get('unmute').execute(message, ARGS)
            break;
        case "reactionrole":
            CLIENT.commands.get('reactionrole').execute(message, ARGS, DISCORD, CLIENT)
            break;
    }

})

CLIENT.login("ODYyMDcxMjg0MTIwMDI3MTY3.YOTAcg.3U-gT9M0tc0m1K3EQYMWKPpIK10");
