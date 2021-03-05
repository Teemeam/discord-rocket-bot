const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, api_key } = require('./config.json');

/* ------ Components ------ */
const giphyRandom = require('giphy-random');

/* ------ Init bot ------ */
client.once('ready', () => {
	console.log('Ready!');
});

/* ------ On message ------ */
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const author = message.author.username;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  /* If user gives command and args  */
	if (command === 'rockets' && args.length > 0) {
    if (args[0] === 'info') {
      message.channel.send('Type !rockets and some tag.');
    } else {
      (async () => {
        const { data } = await giphyRandom(api_key, {
          tag: args[0]
        });

        /* If data found */
        if (data.url) {
          message.reply('here is your ' + args[0] + '.');
          message.channel.send(data.url);
        } else {
          message.channel.send('Got nothing.');
        }
      })();
    }
  } 
  
  /* If user gives command but no args  */
  else if (command === 'rockets' && args.length === 0) {
    (async () => {
      const { data } = await giphyRandom(api_key, {
        tag: 'spacex'
      });
      message.channel.send(data.url);
    })();
  }
});

/* ------ Pass Discord token ------ */
client.login(token);