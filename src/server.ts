import http from 'http';
import router from './router';

export default http.createServer((request, response) => {
  const route = router(request.url ?? '');
  response.writeHead(route.status, route.type);
  response.write(route.content);
  response.end();
});
