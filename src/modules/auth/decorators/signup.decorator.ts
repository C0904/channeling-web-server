import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from '@app/common/dtos/swaggerException.dto';

export function Signup(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: '회원가입' }),
    ApiCreatedResponse({ type: SwaggerExceptionDto }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiConflictResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
