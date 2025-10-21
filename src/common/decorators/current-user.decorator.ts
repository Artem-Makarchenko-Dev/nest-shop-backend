import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../../auth/types/jwt.type';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtUser | undefined, context: ExecutionContext): JwtUser | any => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtUser | undefined;
    return data ? user?.[data] : user;
  },
);