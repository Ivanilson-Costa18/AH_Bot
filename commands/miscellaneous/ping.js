
module.exports = {
    name: 'ping',
    description: 'list commands',
    async execute(client, message, args, discord, cmd){
        message.channel.send("pong!")
    }
}