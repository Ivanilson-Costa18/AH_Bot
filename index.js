const DISCORD = require('discord.js') 
const CLIENT = new DISCORD.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
var dotenv = require('dotenv')
dotenv.config({path: './.env'})

CLIENT.commands = new DISCORD.Collection();
CLIENT.events = new DISCORD.Collection()

let folders  = ['command_handlers', 'event_handlers']
folders.forEach(handler => {
    require(`./handlers/${handler}`)(CLIENT, DISCORD)
});

CLIENT.login(process.env.TOKEN);

