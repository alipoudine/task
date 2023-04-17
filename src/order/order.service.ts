import { Injectable } from '@nestjs/common';
import { VendingMachineService } from 'src/vending-machine/vending-machine.service';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  counter: number;
  orders: Map<number, Order>;

  constructor(private readonly vendingMachineService: VendingMachineService) {
    this.counter = 0;
    this.orders = new Map();
  }

  initOrder(): number {
    let order = new Order(this.vendingMachineService.selectMachine());
    this.orders[this.counter] = order;
    this.counter = this.counter + 1;
    return this.counter;
  }

  getProducts(id: number) {
    return this.orders[id].machine.getInventory();
  }

  chargeBalance(id: number, amount: number): string {
    return this.orders[id].pay(amount);
  }

  purchaseProduct(id: number, product: string): string {
    return this.orders[id].purchase(product);
  }
}