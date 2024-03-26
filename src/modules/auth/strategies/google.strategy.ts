import { SocialType } from '@app/common/enums/social-type.decorator';
import { Authentication } from '@app/entities/authentication.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<{ authentication: Authentication; isNewUser: boolean }> {
    const { id, emails } = profile;
    const email = emails[0].value;

    return await this.authenticationService.getAuth({
      id,
      socialType: SocialType.GOOGLE,
      email,
    });
  }
}
