import Joi from 'joi';

interface AppConfig {
  APP_PORT: number;
  APP_PACKAGE_JSON_PATH: string;
  DATABASE_URL: string;
}

export const AppConfigValidationSchema = (): Joi.ObjectSchema<AppConfig> =>
  Joi.object({
    APP_PORT: Joi.number().required(),
    APP_PACKAGE_JSON_PATH: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
  });
