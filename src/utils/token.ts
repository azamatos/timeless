import { ForbiddenException } from '@nestjs/common';

// third party
import * as jwt from 'jsonwebtoken';

export function getToken(token: string) {
  // Bearer word length with space
  const bearer = 7;
  try {
    const newToken = token.includes('Bearer')
      ? token.substring(bearer, token.length - bearer)
      : token;

    const user = jwt.decode(newToken, { json: true });

    return user;
  } catch (err) {
    throw new ForbiddenException('Check ur token');
  }
}
