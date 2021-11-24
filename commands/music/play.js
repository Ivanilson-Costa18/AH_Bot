const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const DISCORD = require('discord.js');
const message = require('../../events/guild/message');
const https = require('https')
const SpotifyWebApi = require('spotify-web-api-node');
const { count } = require('console');
const spotify_regex = /([a-zA-Z0-9]+)[?]/
var client_id = 'ae3f595684394ec781951659ff01fcfd'; // Your client id
var client_secret = 'deeda28a8d7246dca3c0a1caf6e287c5'; // Your secret

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
  });

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );


const queue = new Map()

module.exports = {
    name: 'play',
    aliases: ['skip', 'leave', 'queue', 'p', 's', 'l'],
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
           
            let track_list = []
            if(args[0].indexOf('open.spotify') > 0) {
                let playlist_id = spotify_regex.exec(args[0])

                await spotifyApi.getPlaylistTracks(playlist_id[1], {
                    fields: 'items'
                })
                .then(
                    async function(data) {
                        for( let track of data.body.items){
                            let song = track.track.name +' '+ track.track.artists[0].name + ' audio'
                            track_list.push(song)
                        }
                    },
                    function(err) {
                    console.log('Something went wrong!', err);
                    }
                );
            } else {
                track_list.push(args.join(''))
            };

            let count = 0
            const queue_constructor = {
                voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: []
            }
            for(let track of track_list){
                let song = {}
                if(ytdl.validateURL(track)){
                    const song_info = await ytdl.getInfo(track)
                    song = {title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
                } else {
                    const videoFinder = async (query) => {
                        const videoResult = await ytSearch(query)
                        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                    }

                    const video = await videoFinder(track);
                    if(track_list.length > 1){
                        if(count < 1){
                            let embed = new DISCORD.MessageEmbed()
                                .setColor('#FF8400')
                                .setDescription(`🎵 Searching for songs :mag_right: [<@${message.author.id}>]`)
                                message.channel.send(embed)
                        }
                    } else {
                        let embed = new DISCORD.MessageEmbed()
                            .setColor('#FF8400')
                            .setDescription(`🎵 Searching :mag_right: ${track} [<@${message.author.id}>]`)
                            message.channel.send(embed)
                    }
                    if (video){
                        song = {title: video.title, url: video.url, duration: video.duration}
                    } else {
                        message.channel.send(`<@${message.author.id}>, Song requested was not found.`)
                    }
                }
                count++
                if(!server_queue){
                    queue_constructor.songs.push(song);
                    if(count === track_list.length) queue.set(message.guild.id, queue_constructor)
                    
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection
                        if(count === track_list.length && track_list.length > 1){
                            video_player(message.guild, queue.get(message.guild.id).songs[0])
                            let embed = new DISCORD.MessageEmbed()
                            .setColor('#FF8400')
                            .setDescription(`🎵 ***${count-1}*** songs added to queue! [<@${message.author.id}>]`)
                            return message.channel.send(embed)
                            }
                        if(count === track_list.length) video_player(message.guild, queue.get(message.guild.id).songs[0])
                    } catch (error) {
                        queue.delete(message.guild.id)
                        message.channel.send('ERROR CONNECTION')
                        throw error
                    }
                } else {
                    server_queue.songs.push(song)
                    if(track_list.length === 1) {
                        let embed = new DISCORD.MessageEmbed()
                        .setColor('#FF8400')
                        .setDescription(`🎵 ***${song.title}***, added to queue! [<@${message.author.id}>]`)
                        return server_queue.text_channel.send(embed)  
                    } else if(count === track_list.length){
                        let embed = new DISCORD.MessageEmbed()
                        .setColor('#FF8400')
                        .setDescription(`🎵 ***${count}*** songs added to queue! [<@${message.author.id}>]`)
                        return message.channel.send(embed)
                    }
                }
            }
        }
        else if( cmd === 'skip' || cmd === 's') skip_song(message, server_queue)
        else if( cmd === 'leave' || cmd === 'l') stop_song(message, server_queue)
        else if( cmd === 'queue') show_queue(message, server_queue)
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
    const stream =  ytdl(song.url, {filter: 'audioonly'}, {quality: 'highestaudio'});
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

const show_queue = (message, server_queue) => {
    if(!server_queue) return message.channel.send('I\'m not playing any songs :sweat_smile:')

    let songs_message = ''
    let songs_list = []
    let difference = 0
    let embed =  new DISCORD.MessageEmbed()
    .setColor('#FF8400')

    songs_list.push(...server_queue.songs)
    embed
    .setTitle(`:headphones: Now playing: ***${songs_list[0].title}*** \n\n`+
              'SONGS QUEUE')
    if(songs_list.length <= 1 ) return message.channel.send(embed.setDescription('***Queue is empty***'));
    songs_list.shift()
    for(let i in songs_list){
        songs_message += `${Number(i)+1} - ***${songs_list[Number(i)].title}***  (${songs_list[Number(i)].duration.timestamp}) \n`
        if(i==4) {
            difference = songs_list.length - i - 1
            break;
        }
    }

    embed
    .setDescription(songs_message)
    if(difference){
        embed.setFooter(`And ${difference} more!!`)
    }

    message.channel.send(embed)
}

