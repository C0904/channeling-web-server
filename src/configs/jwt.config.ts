import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtOptions = (config: ConfigService): JwtModuleOptions => {
  return {
    secret: config.get('JWT_SECRET'),
    signOptions: {
      expiresIn: config.get('JWT_EXPIRE_IN'),
    },
  };
};
