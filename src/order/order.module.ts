import { Module } from '@nestjs/common';
import { VendingMachineModule } from 'src/vending-machine/vending-machine.module';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService],
  imports: [VendingMachineModule],
})
export class OrderModule {}
