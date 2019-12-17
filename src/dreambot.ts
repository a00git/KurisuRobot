import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export const parseHtml = (html: string): HTMLImageElement[] => {
  const dom = new JSDOM(html);
  const htmlCollection = dom.window.document.querySelectorAll('a')[1].children;
  return Array.from(htmlCollection) as HTMLImageElement[];
};

export const getDBsHealth = async (): Promise<number> => {
  const response = await fetch('https://dreamingrobot.herokuapp.com/');
  const html = await response.text();
  return parseHtml(html).reduce((hp, img) => {
    switch (img.alt) {
      case 'Full heart': return hp + 1;
      case 'Half heart': return hp + 0.5;
      default: return hp;
    }
  }, 0);
};
