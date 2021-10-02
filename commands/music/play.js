const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const DISCORD = require('discord.js')

const queue = new Map()

module.exports = {
    name: 'play',
    aliases: ['skip', 'leave', 'p', 's', 'l'],
    cooldown: 0,
    description: 'Joins and plays music',
    async execute(client, message, args, discord, cmd){
        const voice_channel = message.member.voice.channel;

        if(!voice_channel) return message.channel.send(`<@${message.author.id}>, you need to be in a voice channel to execute the command!`);
        const permissions = voice_channel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send(`<@${message.author.id}>, you don't have the correct permissions!`);
        if(!permissions.has('SPEAK')) return message.channel.send(`<@${message.author.id}>, you don't have the correct permissions!`);

        const server_queue = queue.get(message.guild.id)

        if(cmd === 'play' || cmd === 'p'){
            if(!args.length)  return message.channel.send(`<@${message.author.id}>, choose a song`);
            let song = {}

            if(ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0])
                song = {title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query)
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));
                let embed = new DISCORD.MessageEmbed()
                    .setColor('#FF8400')
                    .setDescription(`🎵 Searching :mag_right: ${args.join(' ')} [<@${message.author.id}>]`)
                    message.channel.send(embed)
                if (video){
                    song = {title: video.title, url: video.url}
                } else {
                    message.channel.send(`<@${message.author.id}>, Song requested was not found.`)
                }
            }

            if(!server_queue){
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
    
                queue.set(message.guild.id, queue_constructor)
                queue_constructor.songs.push(song);
    
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection
                    video_player(message.guild, queue_constructor.songs[0])
                } catch (error) {
                    queue.delete(message.guild.id)
                    message.channel.send('ERROR CONNECTION')
                    throw error
                }
            } else {
                server_queue.songs.push(song)
                let embed = new DISCORD.MessageEmbed()
                .setColor('#FF8400')
                .setDescription(`🎵 ***${song.title}***, added to queue! [<@${message.author.id}>]`)
                return server_queue.text_channel.send(embed)
            }
        } 
        else if( cmd === 'skip' || cmd === 's') skip_song(message, server_queue)
        else if( cmd === 'leave' || cmd === 'l') stop_song(message, server_queue)
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if(!song){
        song_queue.text_channel.send('Queue is empty, I\'ll be leaving. :pensive:')
        song_queue.voice_channel.leave();
        queue.delete(guild.id)
        return;
    }
    const stream =  ytdl(song.url, {filter: 'audioonly'});
    song_queue.connection.play(stream, {seek: 0, volume: 1})
    .on('finish', ()=> {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    })
    let embed = new DISCORD.MessageEmbed()
    .setColor('#FF8400')
    .setDescription(`:headphones: Now playing ***${song.title}***!`)
    await song_queue.text_channel.send(embed)
}

const skip_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send(`<@${message.author.id}, you need to join the voice channel to use this command.`);
    if(!server_queue) return;
    server_queue.connection.dispatcher.end();
    let embed = new DISCORD.MessageEmbed()
    .setColor('#FF8400')
    .setDescription(`Song skipped :handshake:`)
    message.channel.send(embed)
}

const stop_song = (message, server_queue) => {
    if(!message.member.voice.channel) return  message.channel.send(`<@${message.author.id}, you need to join the voice channel to use this command.`);
    server_queue.songs = []
    server_queue.connection.dispatcher.end();
}