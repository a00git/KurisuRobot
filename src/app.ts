import bot from './bot';
import server from './server';

const main = async (): Promise<void> => {
  await bot.launch();
  server.listen(process.env.PORT || 3000);
};

main().catch(err => console.error(err));
