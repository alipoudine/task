import { Module } from '@nestjs/common';
import { VendingMachineModule } from 'src/vending-machine/vending-machine.module';
import { OrderService } from './order.service';

@Module({
  imports: [VendingMachineModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
