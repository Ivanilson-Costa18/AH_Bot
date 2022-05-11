module.exports = {
    name: 'help',
    description: 'list commands',
    aliases: ['h'],
    async execute(client, message, args, discord, cmd){
        message.channel.send( new discord.MessageEmbed()
        .setColor('#FF8400')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .setTitle('My Commands: \n\n')
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'MUSIC', value: '\u200B' },
            { name: 'play, p', value: 'play songs', inline: true },
            { name: 'skip, s', value: 'skip current song', inline: true },
            { name: 'leave, l', value: 'leave voice channel', inline: true },
            { name: 'queue', value: 'show songs queue', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'MODERATION', value: '\u200B' },
            { name: 'ban', value: 'ban member', inline: true },
            { name: 'kick', value: 'kick member', inline: true },
            { name: 'clear', value: 'clear nº messages', inline: true },
            { name: 'mute', value: 'mute member', inline: true },
            { name: 'unmute', value: 'unmute member', inline: true },
            { name: '\u200B', value: '\u200B' }
            )
        .setFooter('Made by: Le IvanPG20'))
    }
}