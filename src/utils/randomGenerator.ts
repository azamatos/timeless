import * as crypto from 'crypto';

export const getRandomLogin = () => {
  return crypto.randomBytes(10).toString('hex');
};
