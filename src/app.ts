import setupBot from './bot';
import server from './server';
import { commands, inlineCommands } from './kurisu';

const main = async (): Promise<void> => {
  const bot = setupBot(commands, inlineCommands);
  await bot.launch();
  server.listen(process.env.PORT || 3000);
};

main().catch(err => console.error(err));
