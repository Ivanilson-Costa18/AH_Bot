const fs = require('fs')

module.exports = (client, discord) => {
    const commandFolders = fs.readdirSync(`./commands/`)
    for(const FOLDER of commandFolders){
        const command_files = fs.readdirSync(`./commands/${FOLDER}`).filter(file => file.endsWith('.js'))
        for(const file of command_files){
            const command = require(`../commands/${FOLDER}/${file}`)
            if(command.name){
                client.commands.set(command.name, command)
            } else {
                continue;
            }
        }
    }   
}