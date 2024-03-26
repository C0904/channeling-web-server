import { ApiProperty } from '@nestjs/swagger';
export class ResSocialSignInDto {
  @ApiProperty({ description: '신규 가입 유저' })
  isNewUser: boolean;

  @ApiProperty({ description: '유저 프로필 작성 여부' })
  setUserInfoState: boolean;

  @ApiProperty({ description: '마지막 로그인 일자' })
  lastLoginedTime: Date;
}
