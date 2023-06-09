import { Logger, LoggerOptions, createLogger } from 'winston';
import { Provider, Type } from '@nestjs/common';
import {
  LOGGER_SERVICE,
  LOGGER_OPTIONS,
  LOGGER_PROVIDER,
} from './logger.constants';
import {
  LoggerModuleAsyncOptions,
  LoggerModuleOptions,
  LoggerModuleOptionsFactory,
} from './logger.interfaces';
import { LoggerService } from './logger.service';

export function createLoggerService(
  loggerOpts: LoggerModuleOptions,
): LoggerService {
  if (loggerOpts.instance) {
    return new LoggerService(loggerOpts.instance);
  }
  return new LoggerService(createLogger(loggerOpts));
}

export function createLoggerProviders(
  loggerOpts: LoggerModuleOptions,
): Provider[] {
  return [
    {
      provide: LOGGER_PROVIDER,
      useFactory: () => createLogger(loggerOpts),
    },
    {
      provide: LOGGER_SERVICE,
      useFactory: (logger: Logger) => {
        return new LoggerService(logger);
      },
      inject: [LOGGER_PROVIDER],
    },
  ];
}

export function createLoggerAsyncProviders(
  options: LoggerModuleAsyncOptions,
): Provider[] {
  const providers: Provider[] = [
    {
      provide: LOGGER_PROVIDER,
      useFactory: (loggerOpts: LoggerOptions) => createLogger(loggerOpts),
      inject: [LOGGER_OPTIONS],
    },
    {
      provide: LOGGER_SERVICE,
      useFactory: (logger: Logger) => {
        return new LoggerService(logger);
      },
      inject: [LOGGER_PROVIDER],
    },
  ];

  if (options.useClass) {
    const useClass = options.useClass as Type<LoggerModuleOptionsFactory>;
    providers.push(
      ...[
        {
          provide: LOGGER_OPTIONS,
          useFactory: async (optionsFactory: LoggerModuleOptionsFactory) =>
            await optionsFactory.createLoggerModuleOptions(),
          inject: [useClass],
        },
        {
          provide: useClass,
          useClass,
        },
      ],
    );
  }

  if (options.useFactory) {
    providers.push({
      provide: LOGGER_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    });
  }

  return providers;
}
