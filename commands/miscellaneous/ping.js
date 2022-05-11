
module.exports = {
    name: 'ping',
    description: 'check for connection',
    async execute(client, message, args, discord, cmd){
        message.channel.send(`<@${message.author.id}>, Pong!`)
    }
}