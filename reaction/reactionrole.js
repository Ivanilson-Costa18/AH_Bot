module.exports = {
    name: 'reactionrole',
    description: 'Set reaction role message',
    async execute(messages, args, discord, client){
        const CHANNEL = '853540209589485574'
        const role1 = ''
        const role2 = ''

        const role1emoji = ''
        const role2emoji = ''

        let embed = new discord.MessageEmbed()
            .setColor()
            .setTitle()
            .setDescription('xxxx\n\n'
                + `${role1emoji}`
                + `${role2emoji}`
            )
        
        let MessageEmbed = await messages.CHANNEL.send('embed')
        MessageEmbed.react(role1emoji)
        MessageEmbed.react(role2emoji)

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL){
                if(reaction.emoji.name === role1emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role1)
                }
                if(reaction.emoji.name === role2emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role2)
                }
            } else {
                return;
            }
        })

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL){
                if(reaction.emoji.name === role1emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role1)
                }
                if(reaction.emoji.name === role2emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role2)
                }
            } else {
                return;
            }
        })
    }
}