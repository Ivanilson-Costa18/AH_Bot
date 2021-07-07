const DISCORD = require('discord.js') 
const CLIENT = new DISCORD.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

module.exports = {
    name: 'genderrole',
    description: 'Set reaction role message',
    async execute(messages, args){
        const CHANNEL = '853540209589485574'
        const maleRole = messages.guild.role.cache.find(role => role.name === 'Male')
        const femaleRole = messages.guild.role.cache.find(role => role.name === 'Female')

        const maleEmoji = ':male_sign:'
        const femaleEmoji = ':female_sign:'

        let embed = new DISCORD.MessageEmbed()
            .setColor("#FF8400")
            .setTitle('Role Menu: Gender Roles')
            .setDescription('React to give yourself a role\n\n'
                + `${maleEmoji}: \`Male\``
                + `${fmaleEmoji}: \`Female\``
            )
        
        let MessageEmbed = await messages.CHANNEL.send(embed)
        MessageEmbed.react(maleEmoji)
        MessageEmbed.react(femaleEmoji)

        CLIENT.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL){
                if(reaction.emoji.name === maleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(maleRole)
                }
                if(reaction.emoji.name === femaleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(femaleRole)
                }
            } else {
                return;
            }
        })

        CLIENT.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL){
                if(reaction.emoji.name === maleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(maleRole)
                }
                if(reaction.emoji.name === femaleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(femaleRole)
                }
            } else {
                return;
            }
        })
    }
}