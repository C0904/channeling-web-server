import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from '@app/common/dtos/swaggerException.dto';
import { ResSocialSignInDto } from '../dtos/res/resSocialSignIn.dto';

export function GoogleAuthRedirect(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: '구글 소셜로그인(accessToken은 cookie로 반환)' }),
    ApiOkResponse({
      type: ResSocialSignInDto,
      description: 'querystring',
    }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
