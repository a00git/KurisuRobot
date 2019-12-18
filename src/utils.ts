import { ContextMessageUpdate } from 'telegraf';

export const randomElementFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const body = (text: string): string => `<html><body>${text}</body></html>`;
export const paragraph = (text: string): string => `<p>${text}</p>`;
export const link = (text: string, url: string): string => `<a href="${url}">${text}</a>`;

export type ChainableFunc<T> = (arg: T) => T;
export const compose = <R>(...funcs: ChainableFunc<R>[]) => (target: R): R => funcs.reduce((t, f) => f(t), target);

export const extractTextFromUpdate = (ctx: ContextMessageUpdate): string => {
  switch (ctx.updateType) {
    case 'message':
      return ctx.message?.text ?? ctx.message?.sticker?.emoji ?? 'can\'t display message';
    case 'edited_message':
      return ctx.editedMessage?.text || 'can\'t display edit';
    case 'inline_query':
      return ctx.inlineQuery?.query || 'can\'t display query';
    case 'chosen_inline_result':
      return ctx.chosenInlineResult?.query || 'can\'t display chosen query';
    default:
      return 'unsupported type';
  }
};
