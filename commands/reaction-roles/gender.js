const DISCORD = require('discord.js') 

module.exports = {
    name: 'genderrole',
    description: 'Set gender reaction role message',
    async execute(message, args, CLIENT){
        message.channel.messages.fetch({limit: 1}).then( messages => 
            message.channel.bulkDelete(messages))
        const CHANNEL = '853540209589485574';
        const maleRole = message.guild.roles.cache.find(role => role.name === 'Male');
        const femaleRole = message.guild.roles.cache.find(role => role.name === 'Female');

        const maleEmoji = '♂️';
        const femaleEmoji = '♀️';

        let embed = new DISCORD.MessageEmbed()
            .setColor("#FF8400")
            .setTitle('Role Menu: Gender Roles')
            .setDescription('React to give yourself a role\n\n'
                + `${maleEmoji} :  \`Male\`\n\n`
                + `${femaleEmoji} :  \`Female\``
            )
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(maleEmoji)
        messageEmbed.react(femaleEmoji)

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