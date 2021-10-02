const DISCORD = require('discord.js') 

module.exports = {
    name: 'platformrole',
    description: 'Set platform reaction role message',
    async execute(CLIENT, message, args){
        message.channel.messages.fetch({limit: 1}).then( messages => 
            message.channel.bulkDelete(messages))
        const CHANNEL1 = '869350581611950100';
        const CHANNEL2 = '853540209589485574';
        const pcrole = message.guild.roles.cache.find(role => role.name === 'PC');
        const mobilerole = message.guild.roles.cache.find(role => role.name === 'Mobile');
        const consolerole = message.guild.roles.cache.find(role => role.name === 'Console');

        const pcEmoji = '🖥️';
        const mobileEmoji = '📱';
        const consoleEmoji = '🎮';

        let embed = new DISCORD.MessageEmbed()
            .setColor("#FF8400")
            .setTitle('Role Menu: Platform Roles')
            .setDescription('React to give yourself a role\n\n'
                + `${pcEmoji} :  \`PC\`\n\n`
                + `${mobileEmoji} :  \`Mobile\`\n\n`
                + `${consoleEmoji} :  \`Console\``
            )
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(pcEmoji)
        messageEmbed.react(mobileEmoji)
        messageEmbed.react(consoleEmoji)

        CLIENT.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL1 || reaction.message.channel.id == CHANNEL2){
                if(reaction.emoji.name === pcEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(pcrole)
                }
                if(reaction.emoji.name === mobileEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(mobilerole)
                }
                if(reaction.emoji.name === consoleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(consolerole)
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

            if (reaction.message.channel.id == CHANNEL1 || reaction.message.channel.id == CHANNEL2){
                if(reaction.emoji.name === pcEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(pcrole)
                }
                if(reaction.emoji.name === mobileEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(mobilerole)
                }
                if(reaction.emoji.name === consoleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(consolerole)
                }
            } else {
                return;
            }
        })
    }
}