import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.command('send', ctx => {
  ctx.reply('Fake command for sending messages into the past');
});

bot.command('receive', ctx => {
  ctx.reply('This command will generate random messages from the future');
});

export default bot;
