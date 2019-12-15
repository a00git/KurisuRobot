import http from 'http';
import bot from './bot';
import router from './router';

const main = async (): Promise<void> => {
  await bot.launch();

  http.createServer((request, response) => {
    const route = router(request.url ?? '');
    response.writeHead(route.status, route.type);
    response.write(route.content);
    response.end();
  }).listen(process.env.PORT || 3000);
};

main().catch(err => console.error(err));
