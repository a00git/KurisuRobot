/* eslint-disable @typescript-eslint/camelcase */
import { Bot, SetupFunc } from './index';
import { InlineCommands } from '../kurisu';

const splitIntoCommandAndArgs = (str: string): [string, string[]] =>
  str.split(' ').reduce<[string, string[]]>((memo, curr, idx) => {
    return idx === 0 ? (memo[0] = curr, memo) : (memo[1].push(curr), memo);
  }, ['', []]);

const setupInlineMode: SetupFunc<InlineCommands> = (commands) => (bot): Bot => {
  bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    const [command, args] = splitIntoCommandAndArgs(inlineQuery?.query || '');

    if (!(command in commands)) {
      return answerInlineQuery([]);
    }

    const messages = await commands[command](args);
    const answers = messages.map((msg, idx) => ({
      id: String(idx),
      type: 'article',
      title: msg,
      input_message_content: {
        message_text: msg,
      },
    }));

    // TODO: define cache_time parameter in InlineCommands
    return answerInlineQuery(answers, { cache_time: 0 });
  });

  return bot;
};

export default setupInlineMode;
