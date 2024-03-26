import * as Joi from 'joi';
import * as path from 'path';

export class EnvConfig {
  private static readonly ENV_FILES: string[] = ['dev', 'prod'];

  private static readonly VALIDATION_SCHEMA: object = Joi.object({
    NODE_ENV: Joi.string()
      .valid(...EnvConfig.ENV_FILES)
      .required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SCHEMA: Joi.string().required(),
    DB_ENTITY_PATH: Joi.string().required(),
  });

  static get nodeFile(): string {
    return path.resolve(`.env.${process.env.NODE_ENV}`);
  }

  static get envFiles(): string[] {
    return EnvConfig.ENV_FILES;
  }

  static get validationSchema(): object {
    return EnvConfig.VALIDATION_SCHEMA;
  }
}
