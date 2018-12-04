const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-493897622352-493901457600-aR3dPuHSSiKW07c1VQNXYilE',
  name: 'jokesOnDemand'
});

//Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':pizza:'
  }
  bot.postMessageToChannel('general', 'Get ready to laugh with @jokesOnDemand ', params);
});


//Error message
bot.on('error', (err) => console.log(err));

//Message handler
bot.on('message', (data) => {
  if(data.type !== 'message')
  {
    return;
  }
  handleMessage(data.text);
});

//Data handler
function handleMessage(message){
  if(message.includes(' chucknorris')){
    chuckJoke();
  }
  else if(message.includes(' yomama')){
    yoMamaJoke();
  }
  else if(message.includes(' random')){
    randomJoke();
  }
}


//Chuck Norris joke
function chuckJoke()
{
  axios.get('https://api.chucknorris.io/jokes/random').then(res => {
    const joke = res.data.value;
    const params = {
      icon_emoji: ':laughing:'
    }
    bot.postMessageToChannel('general',`Chuck Norris : ${joke} `, params);
  });
}


//Yo mama joke
function yoMamaJoke()
{
  axios.get('https://api.yomomma.info/').then(res => {
    const joke = res.data.joke;
    const params = {
      icon_emoji: ':girl:'
    }
    bot.postMessageToChannel('general',`Yo mama joke : ${joke} `, params);
  });
}


//Tell a random joke
function randomJoke()
{
  const rand = Math.floor(Math.random() * 2 ) + 1;
  if(rand === 1){
    chuckJoke();
  }
  else {
    yoMamaJoke();
  }
}
