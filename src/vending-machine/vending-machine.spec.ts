import { VendingMachine, VendingMachineState } from './vending-machine.model';

describe('VendingMachine', () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    const products = [
      { name: 'Coke', price: 1.5, count: 3 },
      { name: 'Pepsi', price: 1.25, count: 2 },
      { name: 'Sprite', price: 1, count: 0 },
    ];
    vendingMachine = new VendingMachine(products);
  });

  describe('constructor', () => {
    it('should initialize inventory and account with default values', () => {
      var len = 0;
      for (var count in vendingMachine.inventory) {
        len++;
      }
      expect(len).toBe(3);
      expect(vendingMachine.account).toBe(0);
      expect(vendingMachine.state).toBe(VendingMachineState.IDLE);
    });
  });

  describe('reserve', () => {
    it('should change state to BUSY', () => {
      vendingMachine.reserve();
      expect(vendingMachine.state).toBe(VendingMachineState.BUSY);
    });
  });

  describe('pay', () => {
    it('should return machine should be reserved first if machine state is IDLE', () => {
      const result = vendingMachine.pay(1);
      expect(result).toBe('machine should be reserved first');
    });

    it('should return payment faild if amount is less than or equal to zero', () => {
      vendingMachine.reserve();
      const result = vendingMachine.pay(0);
      expect(result).toBe('payment faild');
    });

    it('should increase the account balance if payment is successful', () => {
      vendingMachine.reserve();
      const result = vendingMachine.pay(2);
      expect(result).toBe('payment was successful');
      expect(vendingMachine.account).toBe(2);
    });
  });

  describe('getInventory', () => {
    it('should return the inventory object', () => {
      const inventory = vendingMachine.getInventory();
      expect(inventory).toEqual(vendingMachine.inventory);
    });
  });

  describe('getProductPrice', () => {
    it('should return the price of the given product', () => {
      const price = vendingMachine.getProductPrice('Coke');
      expect(price).toBe(1.5);
    });

    it('should return undefined if the given product does not exist', () => {
      const price = vendingMachine.getProductPrice('Fanta');
      expect(price).toBeUndefined();
    });
  });

  describe('purchase', () => {
    it('should return an error message if machine is not reserved', () => {
      vendingMachine.state = VendingMachineState.IDLE;
      const result = vendingMachine.purchase('Coke');
      expect(result).toEqual(['machine should be reserved first', 0, false]);
    });

    it('should return an error message if selected product does not exist', () => {
      vendingMachine.reserve();
      const result = vendingMachine.purchase('Water');
      expect(result[0]).toEqual('selected product does not exists');
      expect(result[1]).toEqual(0);
      expect(result[2]).toEqual(false);
    });

    it('should return an error message if selected product is out of stock', () => {
      vendingMachine.reserve();
      vendingMachine.pay(2);
      const result = vendingMachine.purchase('Sprite');
      expect(result[0]).toEqual(
        'selected product does not exists in inventory',
      );
      expect(result[1]).toEqual(2);
      expect(result[2]).toEqual(false);
    });

    it('should return an error message if there is not enough balance', () => {
      vendingMachine.reserve();
      vendingMachine.account = 0;
      const result = vendingMachine.purchase('Coke');
      expect(result).toEqual(['not enough balance', 0, false]);
    });

    it('should decrement the inventory count by 1 for the selected product', () => {
      vendingMachine.reserve();
      vendingMachine.pay(3);
      const result = vendingMachine.purchase('Coke');
      expect(vendingMachine.inventory['Coke'].count).toBe(2);
    });

    it('should decrement the account balance by the product price', () => {
      vendingMachine.reserve();
      vendingMachine.pay(3);
      const result = vendingMachine.purchase('Coke');
      expect(vendingMachine.account).toBe(1.5);
    });

    it('should return a success message and update the account balance if the purchase is successful', () => {
      vendingMachine.reserve();
      vendingMachine.pay(3);
      const result = vendingMachine.purchase('Coke');
      expect(result[0]).toEqual('purchase was successful');
      expect(result[1]).toEqual(1.5);
      expect(result[2]).toEqual(true);
    });
  });
});
