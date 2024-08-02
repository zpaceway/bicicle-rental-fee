import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: databaseProviders.map((provider) =>
    TypeOrmModule.forRootAsync(provider),
  ),
})
export class DatabasesModule {}
