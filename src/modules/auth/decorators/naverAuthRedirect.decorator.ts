import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from '@app/common/dtos/swaggerException.dto';
import { ResSocialSignInDto } from '../dtos/res/resSocialSignIn.dto';

export function NaverAuthRedirect(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: '네이버 소셜로그인(accessToken은 cookie로 반환)' }),
    ApiOkResponse({
      type: ResSocialSignInDto,
      description: 'querystring',
    }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
