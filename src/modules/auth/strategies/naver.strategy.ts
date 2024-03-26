import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { SocialType } from '@app/common/enums/social-type.decorator';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const id = profile._json.id;
    const email = profile._json.email;

    const user = await this.authenticationService.getAuth({
      id,
      email,
      socialType: SocialType.NAVER,
    });

    return done(null, user);
  }
}
