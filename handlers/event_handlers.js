const fs = require('fs')

module.exports = (client, discord) => {
    const load_dir = dir => {
        const event_files = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'))

        for(const file of event_files){
            const event = require(`../events/${dir}/${file}`)
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, discord, client))
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e))
}