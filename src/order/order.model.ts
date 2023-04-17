import { VendingMachine } from 'src/vending-machine/vending-machine.model';

export enum OrderState {
  INIT = 0,
  COMPLETED = 1,
  REJECTED = 2,
}

export class Order {
  product: string;
  account: number;
  machine: VendingMachine;
  state: OrderState;

  constructor(machine: VendingMachine) {
    this.account = 0;
    this.machine = machine;
    this.state = OrderState.INIT;
  }

  pay(amount: number): string {
    if (this.state != OrderState.INIT) return 'order is over';
    return this.machine.pay(amount);
  }

  purchase(product: string): string {
    if (this.state != OrderState.INIT) return 'order is over';
    this.product = product;

    let result = this.machine.purchase(product);

    result[2]
      ? (this.state = OrderState.COMPLETED)
      : (this.state = OrderState.REJECTED);

    this.account += result[1];

    this.machine = undefined;
    return result[0];
  }
}
