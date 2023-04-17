import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [VendingMachineModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
