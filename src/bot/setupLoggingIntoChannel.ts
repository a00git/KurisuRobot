import { ApplierFunc } from './index';
import { extractTextFromUpdate } from '../utils';

const setupLoggingIntoChannel: ApplierFunc = (bot) => {
  const logsChannelId = process.env.LOGS_CHANNEL || '';

  bot.use(async (ctx, next) => {
    const text = extractTextFromUpdate(ctx);
    const author = ctx.update.message?.from?.username ?? 'unknown source';

    ctx.telegram.sendMessage(logsChannelId, `${author}: ${text}`);
    if (next) {
      await next();
    }
  });

  return bot;
};

export default setupLoggingIntoChannel;
