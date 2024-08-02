import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabasesModule } from './databases/databases.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ConfigurationModule, DatabasesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
