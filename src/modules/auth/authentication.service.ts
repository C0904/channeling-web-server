import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from './authentication.repository';
import { Authentication } from '@app/entities/authentication.entity';
import { SocialSignInDto } from './dtos/req/socialSignIn.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async getAuth(socialSignInDto: SocialSignInDto): Promise<{
    authentication: Authentication;
    isNewUser: boolean;
    setUserInfoState: boolean;
  }> {
    const { id } = socialSignInDto;

    let authentication: any =
      await this.authenticationRepository.findByIdWithUser(id);
    let isNewUser = false;
    let setUserInfoState = false;

    if (!authentication) {
      const insertResult = await this.authenticationRepository.insert(
        socialSignInDto,
      );

      authentication = await this.authenticationRepository.findByIdWithUser(
        insertResult.identifiers[0].id,
      );

      isNewUser = true;
      setUserInfoState = false;
    } else {
      await this.authenticationRepository.update(
        { id: authentication.id },
        { lastLoginedTime: () => 'CURRENT_TIMESTAMP()' },
      );
    }

    if (authentication.userId !== null && authentication.nickname !== null) {
      setUserInfoState = true;
    }

    return { authentication, isNewUser, setUserInfoState };
  }
}
