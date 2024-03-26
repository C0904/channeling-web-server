import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { WinstonLogger } from '@app/configs/winston-singleton.config';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  private logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();

    return next.handle().pipe(
      map((data) => {
        WinstonLogger.debug(data);
        return {
          success: true,
          data: Array.isArray(data) ? [...data] : data,
        };
      }),
    );
  }
}
