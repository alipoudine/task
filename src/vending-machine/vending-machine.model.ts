export enum VendingMachineState {
  IDLE = 0,
  BUSY = 1,
}

class Product {
  name: string;
  price: number;
  count: number;
}

export class VendingMachine {
  state: VendingMachineState;
  account: number;
  inventory: Map<string, Product>;

  constructor(prds: Object[]) {
    this.inventory = new Map();
    this.account = 0;
    this.state = VendingMachineState.IDLE;
    for (let i = 0; i < prds.length; i++) {
      let prd = new Product();
      prd.name = prds[i]['name'];
      prd.price = prds[i]['price'];
      prd.count = prds[i]['count'];
      this.inventory[prd.name] = prd;
    }
  }

  reserve() {
    this.state = VendingMachineState.BUSY;
  }

  pay(amount: number): string {
    if (this.state == VendingMachineState.IDLE)
      return 'machine should be reserved first';
    if (amount <= 0) return 'payment faild';
    this.account = this.account + amount;
    return 'payment was successful';
  }

  getInventory(): Object {
    return this.inventory;
  }

  getProductPrice(product: string): number {
    if (!this.inventory[product]) return;

    return this.inventory[product].price;
  }

  purchase(product: string): [string, number, boolean] {
    if (this.state == VendingMachineState.IDLE) {
      this.state = VendingMachineState.IDLE;
      return ['machine should be reserved first', 0, false];
    }

    if (!this.inventory[product]) {
      this.state = VendingMachineState.IDLE;
      return ['selected product does not exists', this.account, false];
    }

    if (this.inventory[product].count <= 0) {
      this.state = VendingMachineState.IDLE;
      return [
        'selected product does not exists in inventory',
        this.account,
        false,
      ];
    }

    if (this.inventory[product].price > this.account) {
      this.state = VendingMachineState.IDLE;
      return ['not enough balance', this.account, false];
    }

    this.account = this.account - this.inventory[product].price;
    this.inventory[product].count = this.inventory[product].count - 1;

    this.state = VendingMachineState.IDLE;

    return ['purchase was successful', this.account, true];
  }
}
