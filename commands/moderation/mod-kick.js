module.exports = {
    name: 'kick',
    description: 'kick member',
    execute(message, args, CLIENT){
        if(message.member.permissions.has('KICK_MEMBER')){
            const MEMBER = message.mentions.users.first()
            if(MEMBER){
                const MEMBER_TARGET = message.guild.members.cache.get(MEMBER.id)
                MEMBER_TARGET.kick()
                message.channel.send(`User ${MEMBER} has been kicked`)
            }else{
                message.channel.send('Missing user')
            }
        }else{
            message.channel.send('No perms')
        }
    }
}
