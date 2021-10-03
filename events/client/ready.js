module.exports = (discord, client) => {
    console.log('BOT ONLINE');
    client.user.setActivity('Donda 😩 | \'$\'', {type: 'LISTENING'}).catch(console.error)
}