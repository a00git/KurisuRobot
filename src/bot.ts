import Telegraf from 'telegraf';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.command('send', ctx => {
  ctx.reply('Fake command for sending messages into the past');
});

bot.command('receive', ctx => {
  ctx.reply('This command will generate random messages from the future');
});

const parseHtml = (html: string): HTMLImageElement[] => {
  const dom = new JSDOM(html);
  const htmlCollection = dom.window.document.querySelectorAll('a')[1].children;
  return Array.from(htmlCollection) as HTMLImageElement[];
};

const getDBsHealth = async (): Promise<number> => {
  const response = await fetch('https://dreamingrobot.herokuapp.com/');
  const html = await response.text();
  return parseHtml(html).reduce((hp, img) => {
    switch (img.alt) {
      case 'Full heart': return hp + 1;
      case 'Half heart': return hp + 0.5;
      default: return hp;
    }
  }, 0);
};

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  if (inlineQuery?.query !== 'db') {
    return answerInlineQuery([]);
  }

  const health = await getDBsHealth();

  return answerInlineQuery([{
    id: '1',
    type: 'article',
    title: `DB's health`,
    input_message_content: {
      message_text: `DB: ${health} HPs`,
    },
  }]);
});

export default bot;
