import { Bot, SetupFunc } from './index';
import { Commands } from '../kurisu';

const setupCommands: SetupFunc<Commands> = (commands) => (bot): Bot => {
  Object.entries(commands).forEach(([path, func]) => {
    bot.command(path, ctx => ctx.replyWithMarkdown(func(ctx.message?.text)));
  });
  return bot;
};

export default setupCommands;
