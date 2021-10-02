const DISCORD = require('discord.js') 
const CLIENT = new DISCORD.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

CLIENT.commands = new DISCORD.Collection();
CLIENT.events = new DISCORD.Collection()

let folders  = ['command_handlers', 'event_handlers']
folders.forEach(handler => {
    require(`./handlers/${handler}`)(CLIENT, DISCORD)
});

CLIENT.login("ODYyMDcxMjg0MTIwMDI3MTY3.YOTAcg.3U-gT9M0tc0m1K3EQYMWKPpIK10");
