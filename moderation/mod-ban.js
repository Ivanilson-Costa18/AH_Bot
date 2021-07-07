module.exports = {
    name: 'ban',
    description: 'ban member',
    execute(message, args){
        if(message.member.permissions.has('BAN_MEMBER')){
            const MEMBER = message.mentions.users.first()
            if(MEMBER){
                const MEMBER_TARGET = message.guild.members.cache.get(MEMBER.id)
                MEMBER_TARGET.ban()
                message.channel.send(`User ${MEMBER_TARGET} has been banned`)
            }else{
                message.channel.send('Missing user')
            }
        }else{
            message.channel.send('No perms')
        }
    }
}
