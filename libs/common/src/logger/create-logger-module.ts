import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { utilities as nestWinstonModuleUtilities } from './logger.utilities';

export function createLoggerModule(): DynamicModule {
  const loggerModule = LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({
              format: configService.getOrThrow<string>('TIMESTAMP_FORMAT'),
            }),
            nestWinstonModuleUtilities.format.nestLike(
              configService.getOrThrow<string>('APP_NAME'),
            ),
          ),
        }),
      ],
    }),
  });
  return loggerModule;
}
