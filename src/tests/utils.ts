import Telegraf from 'telegraf';
import * as utils from '../utils';

describe('utils', () => {
  test('compose should return same objects with applied effects', () => {
    const target = {};
    const fn1 = jest.fn((t) => (t.fn1 = true, t));
    const fn2 = jest.fn((t) => (t.fn2 = false, t));

    const composer = utils.compose(fn1, fn2);
    const result = composer(target);

    expect(result).toBeTruthy();
    [fn1, fn2].forEach(fn => expect(fn).toBeCalledTimes(1));
    expect(result).toMatchObject({
      fn1: true,
      fn2: false,
    });
  });

  test('html helpers should generate valid html', () => {
    const snapshot = '<html><body><p>Sample text</p><p>Sample text with a <a href="#">link</a></p></body></html>';
    const html = utils.body(
      utils.paragraph('Sample text'),
      utils.paragraph(`Sample text with a ${utils.link('link', '#')}`),
    );

    expect(html).toEqual(snapshot);
  });

  test('should extract text from ContextMessageUpdate', () => {
    const parse = jest.fn(utils.extractTextFromUpdate);
    const message = {
      chat: { id: 1 },
      text: 'Sample text'
    };
    let text;

    const bot = new Telegraf();
    bot.use(async (ctx) => {
      text = parse(ctx);
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    bot.handleUpdate({ message: message }); // handleUpdate is used by Telegraf devs in their tests

    expect(parse).toBeCalled();
    expect(text).toEqual(message.text);
  });
});
