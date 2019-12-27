import Roll from 'roll';
import { getDBsHealth } from './dreambot';

type Command = (args?: string) => string;
type InlineCommand = (args?: string[]) => Promise<string[]>;

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
  db: async () => {
    const health = await getDBsHealth();
    return [`DB has ${health} HPs`];
  },
  quote: async () => {
    const quotes = [
      'Something must be wrong for you to use my actual name.',
      'Say it right, Hououin Pervert-Kyouma!',
      'Who\'ll eat a pervert\'s banana anyway?',
      '99.9% of science is boring.'
    ];
    return quotes;
  },
  roll: async (args) => {
    if (args && args.length > 0) {
      const roller = new Roll;
      const { result } = roller.roll(args.join(''));
      return [String(result)];
    }
    return [];
  },
};
