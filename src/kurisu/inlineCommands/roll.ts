import { InlineCommand } from '..';
import Roll = require('roll');
const roller = new Roll;

const roll: InlineCommand = async (args) => {
  const defaultAnswer = {
    title: 'Looks like your roll query isn\'t valid.',
    message: 'Looks like your roll query isn\'t valid.',
    cache: 1000,
  };

  if (args == null || args.length === 0) {
    return [defaultAnswer];
  }

  const dices = args.join('');
  if (roller.validate(dices)) {
    return [{
      title: '~tap to post your result in chat~',
      message: `${dices}: ${roller.roll(dices).result}`,
      cache: 0,
    }];
  }
  return [defaultAnswer];
};

export default roll;