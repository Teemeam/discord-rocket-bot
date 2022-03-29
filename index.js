const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, channel_id, api_key } = require('./config.json');

/* ------ Packages ------ */
const giphyRandom = require('giphy-random');
const { getImage } = require('random-reddit');

/* ------ Info text ------ */
const info = '`!r gif <tag>` returns a random GIF from GIPHY.\n`!r img <subreddit>` returns a random image from the subreddit.';

/* ------ On start-up ------ */
client.once('ready', () => {
  console.log('Ready!');
  /* client.channels.fetch(channel_id)
    .then(channel => {
      channel.send('Ready for your service!');
    }) */
});

/* ------ On message ------ */
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const author = message.author.username;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  /* If user gives command and args  */
	if ((command === 'rockets' || command === 'r') && args.length > 0) {

    /* If the first arg is 'gif' */
    if (args[0] === 'gif') {

      /* If user specifies topic */
      if (args[1]) {
        (async () => {
          const { data } = await giphyRandom(api_key, {
            tag: args[1]
          });
  
          /* If data found */
          if (data.url) {
            message.reply('here is your ' + args[1] + ' GIF.');
            message.channel.send(data.url);
          } else {
            message.channel.send('Got nothing.');
          }
        })();

      /* If user doesn't specify a topic */
      } else {
        (async () => {
          const { data } = await giphyRandom(api_key, {
            tag: 'spacex'
          });
  
          /* If data found */
          if (data.url) {
            message.reply('here is your SpaceX GIF.');
            message.channel.send(data.url);
          } else {
            message.channel.send('Got nothing.');
          }
        })();
      }
    
    /* If the first arg is 'meme' */
    } else if (args[0] === 'img') {

      /* If user specifies a subreddit */
      if (args[1]) {
        (async () => {
          try {
            const img = await getImage(args[1]);

            if (img.length > 0) {
              message.reply('here is your ' + args[1] + ' image.');
              message.channel.send(img);
            } else {
              message.channel.send(`No images on the subreddit called "${ args[1] }".`);
            }
          } catch {
            message.channel.send(`A subreddit called "${ args[1] }" does not exist.`);
          }
        })();

      /* If user doesn't specify a subreddit */
      } else {
        (async () => {
          try {
            const img = await getImage('spacex');

            if (img.length > 0) {
              message.reply('here is your SpaceX meme.');
              message.channel.send(img);
            } else {
              message.channel.send('No images on the subreddit called "SpaceX".');
            }
          } catch {
            message.channel.send('There is no subreddit dedicated to SpaceX.');
          }
        })();
      }

    /* If the first arg is something else */
    } else {
      message.channel.send(info);
    }
  
  /* If user gives a command but no args */
  } else if ((command === 'rockets' || command === 'r') && args.length === 0) {
    (async () => {
      const { data } = await giphyRandom(api_key, {
        tag: 'spacex'
      });

      /* If data found */
      if (data.url) {
        message.reply('here is your SpaceX GIF.');
        message.channel.send(data.url);
      } else {
        message.channel.send('Got nothing.');
      }
    })();

  /* If user types in the prefix but doesn't give a command */
  } else {
    message.channel.send(info);
  }
});

/* ------ Pass Discord token ------ */
client.login(token);