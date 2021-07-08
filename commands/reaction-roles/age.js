const DISCORD = require('discord.js') 

module.exports = {
    name: 'agerole',
    description: 'Set age reaction role message',
    async execute(message, args, CLIENT){
        message.channel.messages.fetch({limit: 1}).then( messages => 
            message.channel.bulkDelete(messages))
        const CHANNEL = '853540209589485574';
        const underageRole = message.guild.roles.cache.find(role => role.name === '13-17');
        const ageRole = message.guild.roles.cache.find(role => role.name === '18+');

        const underageEmoji = '🧒';
        const ageEmoji = '🧑';

        let embed = new DISCORD.MessageEmbed()
            .setColor("#FF8400")
            .setTitle('Role Menu: Age Roles')
            .setDescription('React to give yourself a role\n\n'
                + `${underageEmoji} :  \`13-17\`\n\n`
                + `${ageEmoji} :  \`18+\``
            )
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(underageEmoji)
        messageEmbed.react(ageEmoji)

        CLIENT.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL){
                if(reaction.emoji.name === underageEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(underageRole)
                }
                if(reaction.emoji.name === ageEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(ageRole)
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
                if(reaction.emoji.name === underageEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(underageRole)
                }
                if(reaction.emoji.name === ageEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(ageRole)
                }
            } else {
                return;
            }
        })
    }
}