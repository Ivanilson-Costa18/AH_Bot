const DISCORD = require('discord.js') 

module.exports = {
    name: 'colorrole',
    description: 'Set color reaction role message',
    async execute(CLIENT, message, args){
        message.channel.messages.fetch({limit: 1}).then( messages => 
            message.channel.bulkDelete(messages))
        const CHANNEL1 = '869350581611950100';
        const CHANNEL2 = '853540209589485574';
        const whiteRole = message.guild.roles.cache.find(role => role.name === 'White');
        const blackRole = message.guild.roles.cache.find(role => role.name === 'Black')
        const redRole = message.guild.roles.cache.find(role => role.name === 'Red')
        const greenRole = message.guild.roles.cache.find(role => role.name === 'Green')
        const purpleRole = message.guild.roles.cache.find(role => role.name === "Purple")

        const whiteEmoji = '⬜'
        const blackEmoji = '⬛' 
        const redEmoji = '🟥'
        const greenEmoji = '🟩'
        const purpleEmoji = '🟪'
    
        let embed = new DISCORD.MessageEmbed()
        .setColor("#FF8400")
        .setTitle('Role Menu: Color Roles')
        .setDescription('React to give yourself a role\n\n'
            +`${whiteEmoji} : White\n\n`
            +`${blackEmoji} : Black\n\n`
            +`${redEmoji} : Red\n\n`
            +`${greenEmoji} : Green\n\n`
            +`${purpleEmoji} : Purple\n\n`
        )

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(whiteEmoji)
        messageEmbed.react(blackEmoji)
        messageEmbed.react(redEmoji)
        messageEmbed.react(greenEmoji)
        messageEmbed.react(purpleEmoji)

        CLIENT.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == CHANNEL1 || reaction.message.channel.id == CHANNEL2){
                if(reaction.emoji.name === whiteEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(whiteRole)
                }
                if(reaction.emoji.name === blackEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blackRole)
                }
                if(reaction.emoji.name === redEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(redRole)
                }
                if(reaction.emoji.name === greenEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(greenRole)
                }
                if(reaction.emoji.name === purpleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(purpleRole)
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
                if(reaction.emoji.name === whiteEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(whiteRole)
                }
                if(reaction.emoji.name === blackEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blackRole)
                }
                if(reaction.emoji.name === redEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(redRole)
                }
                if(reaction.emoji.name === greenEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(greenRole)
                }
                if(reaction.emoji.name === purpleEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(purpleRole)
                }
            } else {
                return;
            }
        })
    }
}