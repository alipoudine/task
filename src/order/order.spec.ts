import {
  VendingMachine,
  VendingMachineState,
} from './../vending-machine/vending-machine.model';
import { Order, OrderState } from './order.model';

describe('Order', () => {
  let vendingMachine: VendingMachine;
  let order: Order;

  beforeEach(() => {
    const products = [
      { name: 'Coke', price: 2.5, count: 5 },
      { name: 'Pepsi', price: 3, count: 3 },
    ];
    vendingMachine = new VendingMachine(products);
    order = new Order(vendingMachine);
  });

  console.log(order);

  describe('pay', () => {
    test('should return payment was successful if the order state is INIT', () => {
      order.machine.reserve();
      const result = order.pay(5);
      expect(result).toBe('payment was successful');
    });

    test('should return order is over if the order state is not INIT', () => {
      order.machine.reserve();
      order.pay(5);
      order.state = OrderState.COMPLETED;
      const result = order.pay(10);
      expect(result).toBe('order is over');
    });
  });

  describe('purchase', () => {
    beforeEach(() => {
      order.machine.reserve();
      order.pay(2.75);
    });

    test('should return purchase was successful if the product exists and the account balance is sufficient', () => {
      const result = order.purchase('Coke');
      expect(result).toBe('purchase was successful');
    });

    test('should return not enough balance if the product exists but the account balance is insufficient', () => {
      const result = order.purchase('Pepsi');
      expect(result).toBe('not enough balance');
    });

    test('should return selected product does not exist if the product does not exist', () => {
      const result = order.purchase('Sprite');
      expect(result).toBe('selected product does not exists');
    });

    test('should return order is over if the order state is not INIT', () => {
      order.purchase('Coke');
      const result = order.purchase('Coke');
      expect(result).toBe('order is over');
    });
  });

  describe('after purchase', () => {
    beforeEach(() => {
      order.machine.reserve();
    });

    test('should set the order state to COMPLETED if the purchase was successful', () => {
      order.pay(3);
      order.purchase('Coke');
      expect(order.state).toBe(1);
    });

    test('should add the remaining account balance to the order account', () => {
      order.pay(3);
      order.purchase('Coke');
      expect(order.account).toBe(0.5);
    });

    test('should set the vending machine to undefined after the purchase', () => {
      order.pay(3);
      order.purchase('Coke');
      expect(order.machine).toBeUndefined();
    });

    test('should set the vending machine state to IDLE after the purchase', () => {
      let machine = order.machine;

      order.pay(3);
      order.purchase('Coke');

      expect(machine.state).toBe(VendingMachineState.IDLE);
    });
  });
});
