module.exports = (discord, client, guildMember) => {
    let role = guildMember.guild.roles.cache.find( role => role.name === 'Member')
    guildMember.roles.add(role)
    guildMember.guild.channels.cache.get('893914933446725742').send(`Welcome to TS, <@${guildMember.user.id}>!!`)
}