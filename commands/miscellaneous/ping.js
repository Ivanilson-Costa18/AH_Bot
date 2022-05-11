
module.exports = {
    name: 'help',
    description: 'list commands',
    aliases: ['h'],
    async execute(client, message, args, discord, cmd){
        message.channel.send("pong!")
    }
}