module.exports = (discord, client, message) => {
    // if(/(https:\/\/)?(discord.gg\/)+[a-zA-Z0-9]/.test(message.content) && !message.member.roles.cache.some(r => r.name.toLowerCase() === "admin" )){
    //     message.delete()    
    //     let embed = new discord.MessageEmbed()
    //     .setColor('#FF8400')
    //     .setTitle('Warning: Invite Link')
    //     .setDescription(`<@${message.author.id}>, you do not have permission to send invite links.`)
    //     message.channel.send(embed)
    //     return;
    // }
    
    const PREFIX = "$"
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/)
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find( a => a.aliases && a.aliases.includes(cmd));

    if(command) command.execute(client, message, args, discord, cmd);
}