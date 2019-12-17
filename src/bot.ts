import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { commands, inlineCommands, Commands, InlineCommands } from './kurisu';

type Bot = Telegraf<ContextMessageUpdate>;
type ApplierFunc = (b: Bot) => Bot;
type SetupFunc<Coms> = (coms: Coms) => ApplierFunc;

const compose = (...funcs: ApplierFunc[]) => (target: Bot): Bot => funcs.reduce((t, f) => f(t), target);

const setupCommands: SetupFunc<Commands> = (commands) => (bot): Bot => {
  Object.entries(commands).forEach(([path, func]) => {
    bot.command(path, ctx => ctx.replyWithMarkdown(func()));
  });
  return bot;
};

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

const bot = new Telegraf(process.env.BOT_TOKEN || '');

export default compose(
  setupCommands(commands),
  setupInlineMode(inlineCommands)
)(bot);
