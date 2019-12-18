import { Bot, SetupFunc } from './index';
import { InlineCommands } from '../kurisu';

const setupInlineMode: SetupFunc<InlineCommands> = (commands) => (bot): Bot => {
  bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    const query = inlineQuery?.query || '';

    if (!(query in commands)) {
      return answerInlineQuery([]);
    }

    const messages = await commands[query]();
    const answers = messages.map((msg, idx) => ({
      id: String(idx),
      type: 'article',
      title: msg,
      input_message_content: {
        message_text: msg,
      },
    }));

    return answerInlineQuery(answers);
  });

  return bot;
};

export default setupInlineMode;
