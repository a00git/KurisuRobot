import { db, quote, roll } from './inlineCommands';

interface InlineCommandResult {
  title: string;
  message: string;
  cache: number;
};

export type Command = (args?: string) => string;
export type InlineCommand = (args?: string[]) => Promise<InlineCommandResult[]>;

export type Commands = { [key: string]: Command };
export type InlineCommands = { [key: string]: InlineCommand };

export const commands: Commands = {
  pet: () => '_\*purr\*~_',
  send: () => 'Fake command for sending messages into the past',
  receive: () => 'This command will generate random messages from the future',
  echo: (args?: string) => {
    if (!args) {
      return '...';
    }
    return args?.length === 5
      ? '...'
      : args?.split(' ').slice(1).join(' ');
  },
};

export const inlineCommands: InlineCommands = {
  db,
  quote,
  roll,
};
