import { Injectable, OnModuleInit } from '@nestjs/common';
import { VendingMachineService } from './vending-machine/vending-machine.service';
import { OrderService } from './order/order.service';
import { VendingMachine } from './vending-machine/vending-machine.model';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly vendingMachineService: VendingMachineService,
    private readonly orderService: OrderService,
  ) {}

  onModuleInit() {
    let mechine1 = new VendingMachine([
      { name: 'soft drink', price: 5, count: 10 },
      { name: 'coffee', price: 3, count: 15 },
    ]);

    this.vendingMachineService.machines.push(mechine1);

    let mechine2 = new VendingMachine([
      { name: 'juice', price: 2, count: 20 },
      { name: 'cola', price: 6, count: 10 },
    ]);

    this.vendingMachineService.machines.push(mechine2);

    // console.log(this.vendingMachineService.machines);
    // for (let i = 0; i < this.vendingMachineService.machines.length; i++) {
    //   console.log(
    //     this.vendingMachineService.machines[i].inventory)
    // }

    this.orderService.initOrder();

    // console.log(this.orderService.orders);
    console.log(this.orderService.getProducts(0));
    console.log(this.orderService.chargeBalance(0, 20));
    console.log(this.orderService.orders);
    console.log(this.orderService.purchaseProduct(0, 'soft drink'));
    console.log(this.orderService.orders);
  }
}
