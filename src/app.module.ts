import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendingMachineModule } from './vending-machine/vending-machine.module';

@Module({
  imports: [VendingMachineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
