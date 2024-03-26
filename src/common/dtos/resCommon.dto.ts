import { ApiProperty } from '@nestjs/swagger';

export class ResCommonDto {
  @ApiProperty({ required: true, description: '성공 여부', example: true })
  success: boolean;
}
