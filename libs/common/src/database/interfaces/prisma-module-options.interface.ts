import { ModuleMetadata, Type } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export interface PrismaModuleOptions {
  isGlobal?: boolean;
  prismaClientOptions?: PrismaClientOptions;
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<PrismaOptionsFactory>;
  useClass?: Type<PrismaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PrismaClientOptions> | PrismaClientOptions;
  inject?: any[];
}

export interface PrismaOptionsFactory {
  createPrismaOptions(): Promise<PrismaClientOptions> | PrismaClientOptions;
}

export interface PrismaClientOptions {
  prismaOptions?: Prisma.PrismaClientOptions;
  explicitConnect?: boolean;
  middlewares?: Array<Prisma.Middleware>;
}
