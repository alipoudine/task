import { Injectable } from '@nestjs/common';
import { VendingMachine, VendingMachineState } from './vending-machine.model';

@Injectable()
export class VendingMachineService {
  machines: VendingMachine[];

  constructor() {
    this.machines = [];
  }

  selectMachine(): VendingMachine {
    for (let i = 0; i < this.machines.length; i++) {
      if (this.machines[i].state == VendingMachineState.IDLE) {
        this.machines[i].state = VendingMachineState.BUSY;
        return this.machines[i];
      }
    }
  }
}
