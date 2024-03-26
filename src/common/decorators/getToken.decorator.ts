import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@app/common/interfaces/tokenPayload.interface';

export const GetToken = createParamDecorator(
  (data, ctx: ExecutionContext): TokenPayload => {
    const req = ctx.switchToHttp().getRequest();

    return req.tokenPayload as TokenPayload;
  },
);
