module.exports = {
    name: 'unmute',
    description: 'unmute member',
    execute(message, args){
        const TARGET = message.mentions.users.first()
        if(TARGET){
            let mainRole = message.guild.roles.cache.find(role => role.name === "Member")
            let muteRole = message.guild.roles.cache.find(role => role.name === "Muted")

            let memberTarget = message.guild.members.cache.get(TARGET.id)
            memberTarget.roles.remove(muteRole.id)
            memberTarget.roles.add(mainRole.id)
            message.channel.send(`User <@${memberTarget.user.id}> has been unmuted`)
        }else{
            message.channel.send('Can\'t find user')
        }
    }
}