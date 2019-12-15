export interface RouterResponse {
  status: number;
  type: { ['Content-Type']: string };
  content: string;
}

const body = (text: string): string => `<html><body>${text}</body></html>`;
const paragraph = (text: string): string => `<p>${text}</p>`;
const link = (text: string, url: string): string => `<a href="${url}">${text}</a>`;

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
