
module.exports = {
    name: 'help',
    description: 'list commands',
    aliases: ['h'],
    async execute(client, message, args, discord, cmd){
        if(cmd === 'ping'){
            message.channel.send("pong!")
        }
    }
}