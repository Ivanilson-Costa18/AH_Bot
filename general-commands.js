module.exports = {
    name: 'ping',
    description: 'ping bot',
    execute(message, args){
        message.channel.send('sup mate!')
    }
}