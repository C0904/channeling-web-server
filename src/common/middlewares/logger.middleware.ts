import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 요청 객체로부터 ip, http method, url, user agent를 받아온 후
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode <= 304) {
        this.logger.log(
          `${originalUrl} (${statusCode}) ${ip} ${userAgent}`,
          method,
        );
      } else if (statusCode >= 400 && statusCode < 500)
        this.logger.warn(
          `${originalUrl} (${statusCode}) ${ip} ${userAgent}`,
          method,
        );
      else if (statusCode >= 500)
        this.logger.error(
          `${originalUrl} (${statusCode}) ${ip} ${userAgent}`,
          method,
        );
    });

    next();
  }
}
