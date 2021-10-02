module.exports = {
    name: 'clear',
    description: 'clear messages',
    async execute(client, message, args){
        if(!args[0]) return message.reply("nºmessages missing")
        if(isNaN(args[0])) return message.reply("nºmessages nan")
        if(args[0] <= 0 || args[0] > 100) return message.reply("0 < nºmessages < 100")

        if(message.member.roles.cache.some(r => r.name.toLowerCase() === "admin" )){
            await message.channel.messages.fetch({limit: args[0]}).then( messages => 
                message.channel.bulkDelete(messages))
        }else{   
            message.channel.send('No perms')
        }
    }
}