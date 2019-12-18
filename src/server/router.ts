import { body, paragraph, link } from '../utils';

export interface RouterResponse {
  status: number;
  type: { ['Content-Type']: string };
  content: string;
}

const rootResponse: RouterResponse = {
  status: 200,
  type: { 'Content-Type': 'text/html' },
  content: body(paragraph(`Bot is up and running ${link('here', 'https://t.me/KurisuRobot')}`)),
};

const notFoundResponse = {
  status: 404,
  type: { 'Content-Type': 'text/html' },
  content: body(paragraph('Page not found')),
};

const router = (path: string): RouterResponse => {
  const routes: { [path: string]: RouterResponse } = {
    '/': rootResponse,
    'default': notFoundResponse,
  };
  return routes[path] || routes.default;
};

export default router;
