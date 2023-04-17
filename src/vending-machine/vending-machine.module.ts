import { Module } from '@nestjs/common';
import { VendingMachineService } from './vending-machine.service';

@Module({
  providers: [VendingMachineService],
  exports: [VendingMachineService],
})
export class VendingMachineModule {}
