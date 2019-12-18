import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { compose, ChainableFunc } from '../utils';
import { Commands, InlineCommands } from '../kurisu';
import setupCommands from './setupCommands';
import setupInlineMode from './setupInlineMode';
import setupLoggingIntoChannel from './setupLoggingIntoChannel';

export type Bot = Telegraf<ContextMessageUpdate>;
export type ApplierFunc = ChainableFunc<Bot>;
export type SetupFunc<Coms> = (coms: Coms) => ApplierFunc;

const bot = new Telegraf(process.env.BOT_TOKEN || '');

export default (commands: Commands, inlineCommands: InlineCommands): Bot => {
  return compose(
    setupCommands(commands),
    setupInlineMode(inlineCommands),
    setupLoggingIntoChannel
  )(bot);
};
