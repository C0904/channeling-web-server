import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';
import { GoogleAuthRedirect } from './decorators/googleAuthRedirect.decorator';
import { NaverAuthRedirect } from './decorators/naverAuthRedirect.decorator';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { NaverAuthGuard } from './guards/naverAuth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('유저 인증 API')
@Controller('/auth')
export class AuthenticationController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async signInGoogle(@Request() req) {
    return;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  @GoogleAuthRedirect()
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    const accessToken: string = this.jwtService.sign(
      JSON.stringify(user.auth),
      {
        secret: this.config.get('JWT_SECRET'),
      },
    );

    const options: CookieOptions = {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    };
    res.cookie('accessToken', 'Bearer ' + accessToken, options);
    return res.redirect(
      `${this.config.get('HOSTING_URL')}/auth/redirect?isNewUser=${
        user?.isNewUser
      }&setUserInfoState=${user?.setUserInfoState}&lastLoginedTime=${
        user.auth?.lastLoginedTime
      }`,
    );
  }

  @UseGuards(NaverAuthGuard)
  @Get('/naver')
  async signInNaver() {
    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get('/naver/callback')
  @NaverAuthRedirect()
  async naverAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    const accessToken: string = this.jwtService.sign(
      JSON.stringify(user.auth),
      {
        secret: this.config.get('JWT_SECRET'),
      },
    );

    const options: CookieOptions = {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    };
    res.cookie('accessToken', 'Bearer ' + accessToken, options);
    return res.redirect(
      `${this.config.get('HOSTING_URL')}/auth/redirect?isNewUser=${
        user?.isNewUser
      }&setUserInfoState=${user?.setUserInfoState}&lastLoginedTime=${
        user.auth?.lastLoginedTime
      }`,
    );
  }
}
