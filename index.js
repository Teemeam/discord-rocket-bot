const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

const random_imgs = [
  'https://media.giphy.com/media/e7PqS0VCIsmi6LKkY4/giphy.gif',
  'https://media.giphy.com/media/XbaBIyuAoyGePuQeP2/giphy.gif',
  'https://media.giphy.com/media/l378lpLXJ9R5JY13O/giphy.gif',
]

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `${ prefix }ping`) {
		message.channel.send(random_imgs[Math.floor(Math.random() * random_imgs.length)]);
	}
});

client.login(token);