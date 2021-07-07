const MS = require('ms')
module.exports = {
    name: 'mute',
    description: 'mute member',
    execute(message, args){
        const TARGET = message.mentions.users.first()
        if(TARGET){
            let mainRole = message.guild.roles.cache.find(role => role.name === "Member")
            let muteRole = message.guild.roles.cache.find(role => role.name === "Muted")

            let memberTarget = message.guild.members.cache.get(TARGET.id)

            if(!args[1]){
                memberTarget.roles.remove(mainRole.id)
                memberTarget.roles.add(muteRole.id)
                message.channel.send(`User <@${memberTarget.user.id}> has been muted`)
                return;
            }
            
            memberTarget.roles.remove(mainRole.id)
            memberTarget.roles.add(muteRole.id)
            message.channel.send(`User <@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`)

            setTimeout(() => {
                memberTarget.roles.remove(muteRole.id)
                memberTarget.roles.add(mainRole.id)
                message.channel.send(`User <@${memberTarget.user.id}> mute has expired`)
            }, ms(args[1]))
        }else{
            message.channel.send('Can\'t find user')
        }
    }
}