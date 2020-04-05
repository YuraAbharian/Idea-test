import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: any, req): object => {
  return data ? req.user[data] : req.user;
});
