import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig } from '@app/configs/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from '@app/configs/mysql.config';
import { LoggerMiddleware } from '@app/common/middlewares/logger.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from './configs/jwt.config';
import { AuthenticationModule } from './modules/auth/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: EnvConfig.nodeFile,
      validationSchema: EnvConfig.validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => getDataSourceOptions(config),
    }),

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => getJwtOptions(config),
    }),

    // Custom Module
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
