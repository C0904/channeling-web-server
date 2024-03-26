import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';
import { AuthenticationRepository } from './authentication.repository';
import { Authentication } from '@app/entities/authentication.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication]),
    JwtModule,
    PassportModule.register({ session: false }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    AuthenticationRepository,
    ConfigService,
    GoogleStrategy,
    NaverStrategy,
  ],
  exports: [AuthenticationService, AuthenticationRepository],
})
export class AuthenticationModule {}
