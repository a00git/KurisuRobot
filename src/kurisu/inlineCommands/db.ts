import { InlineCommand } from '..';
import { getDBsHealth } from '../dreambot';

const db: InlineCommand = async () => {
  const health = await getDBsHealth();
  const result = `DB has ${health} HPs`;
  return [{
    title: result,
    message: result,
    cache: 5,
  }];
}

export default db;
