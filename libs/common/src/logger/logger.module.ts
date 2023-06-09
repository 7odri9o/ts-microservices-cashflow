import { DynamicModule, Global, LoggerService, Module } from '@nestjs/common';
import {
  LoggerModuleAsyncOptions,
  LoggerModuleOptions,
} from './logger.interfaces';
import {
  createLoggerService,
  createLoggerAsyncProviders,
  createLoggerProviders,
} from './logger.providers';

@Global()
@Module({})
export class LoggerModule {
  public static forRoot(options: LoggerModuleOptions): DynamicModule {
    const providers = createLoggerProviders(options);

    return {
      module: LoggerModule,
      providers: providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const providers = createLoggerAsyncProviders(options);

    return {
      module: LoggerModule,
      imports: options.imports,
      providers: providers,
      exports: providers,
    } as DynamicModule;
  }

  public static createLogger(options: LoggerModuleOptions): LoggerService {
    return createLoggerService(options);
  }
}
