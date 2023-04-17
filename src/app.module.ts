import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [VendingMachineModule, OrderModule],
  providers: [AppService],
})
export class AppModule {}
