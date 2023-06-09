import { Logger, LoggerOptions } from 'winston';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';

export type LoggerModuleOptions = LoggerOptions & {
  /**
   * Optional Winston instance to use
   * This takes precedence on any other options provided
   */
  instance?: Logger;
};

export type NestLikeConsoleFormatOptions = {
  colors?: boolean;
  prettyPrint?: boolean;
};

export interface LoggerModuleOptionsFactory {
  createLoggerModuleOptions():
    | Promise<LoggerModuleOptions>
    | LoggerModuleOptions;
}

export interface LoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
  inject?: any[];
  useClass?: Type<LoggerModuleOptionsFactory>;
}
