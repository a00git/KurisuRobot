import http from 'http';
import bot from './bot';

const main = async () => {
  await bot.launch();
  http.createServer((req, res) => {
    res.end('Test~');
  }).listen(process.env.PORT || 3000);
};

main().catch(err => console.error(err));
