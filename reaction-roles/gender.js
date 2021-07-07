module.exports = {
    name: 'genderrole',
    description: 'Set reaction role message',
    async execute(messages, args, discord, client){
        const CHANNEL = '853540209589485574'
        const role1 = 'Male'
        const role2 = 'Female'

        const role1emoji = ':male_sign:'
        const role2emoji = ':female_sign:'

        let embed = new discord.MessageEmbed()
            .setColor("#FF8400")
            .setTitle('Role Menu: Gender Roles')
            .setDescription('React to give yourself a role\n\n'
                + `${role1emoji}: \`Male\``
                + `${role2emoji}: \`Female\``
            )
        
        let MessageEmbed = await messages.CHANNEL.send(embed)
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