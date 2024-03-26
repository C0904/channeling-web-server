import { ApiProperty } from '@nestjs/swagger';

export class SwaggerExceptionDto {
  @ApiProperty({ required: true, description: '성공 여부', example: false })
  success: boolean;

  @ApiProperty({ required: true, description: '응답 메시지' })
  message: string;
}
