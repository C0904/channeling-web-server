import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { jwtPassUrl } from '@app/configs/jwtPassUrl.config';
import { WinstonLogger } from '@app/configs/winston-singleton.config';
import { ResMessage } from '@app/configs/resMessage.config';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@app/common/interfaces/tokenPayload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private config: ConfigService, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (jwtPassUrl.includes(request.path)) {
      return true;
    }

    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
      throw new HttpException(
        ResMessage.NO_TOKEN_INFORMATION,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = bearerToken.replace('Bearer ', '');
    request.tokenPayload = this.validateToken(accessToken);

    WinstonLogger.debug(request.tokenPayload, JwtAuthGuard.name);

    return true;
  }

  // 토큰 검증
  validateToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token, {
        publicKey: this.config.get('JWT_SECRET'),
      });
    } catch (error) {
      const errMsg = error.message;
      WinstonLogger.debug(errMsg, JwtAuthGuard.name);

      if (errMsg === 'invalid token') {
        throw new HttpException(
          ResMessage.INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else if (errMsg === 'jwt expired') {
        throw new HttpException(
          ResMessage.EXPIRED_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else if (errMsg === 'jwt malformed') {
        throw new HttpException(
          ResMessage.MALFORMED_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(ResMessage.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
    }
  }
}
