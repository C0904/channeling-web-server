import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from '@app/common/filters/allException.filter';
import { SuccessInterceptor } from '@app/common/interceptors/success.interceptor';
import { WinstonLogger } from '@app/configs/winston-singleton.config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: WinstonLogger });

  // get ENV data
  const config = app.get(ConfigService);

  // client Domain OR Host AND allow Http Method
  app.enableCors({
    origin: ['http://localhost:3003', 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // accept Cookies OR Authorization Header
  });

  // use graceful shutdown
  app.enableShutdownHooks();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  await app.listen(config.get('APP_PORT'));
}

bootstrap();
