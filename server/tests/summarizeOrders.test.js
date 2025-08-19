const { summarizeOrders } = require('../src/summarizeOrders');

describe('summarizeOrders', () => {
  test('handles typical order data correctly', () => {
    const orders = [
      { id: 1, product: 'Laptop', qty: 2, price: 1000 },
      { id: 2, product: 'Mouse', qty: 5, price: 25 },
      { id: 3, product: 'Laptop', qty: 1, price: 1000 },
      { id: 4, product: 'Keyboard', qty: 3, price: 75 }
    ];

    const result = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(3350); // 2000 + 125 + 1000 + 225
    expect(result.medianOrderPrice).toBe(612.5); // sorted: [125, 225, 1000, 2000] -> (225+1000)/2
    expect(result.topProductByQty).toBe('Mouse'); // 5 qty
    expect(result.uniqueProductCount).toBe(3); // Laptop, Mouse, Keyboard
  });

  test('handles empty array', () => {
    const result = summarizeOrders([]);

    expect(result.totalRevenue).toBe(0);
    expect(result.medianOrderPrice).toBe(0);
    expect(result.topProductByQty).toBe('');
    expect(result.uniqueProductCount).toBe(0);
  });

  test('handles null/undefined input', () => {
    expect(summarizeOrders(null)).toEqual({
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: '',
      uniqueProductCount: 0
    });

    expect(summarizeOrders(undefined)).toEqual({
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: '',
      uniqueProductCount: 0
    });
  });

  test('handles single order', () => {
    const orders = [{ id: 1, product: 'Laptop', qty: 1, price: 1000 }];
    const result = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(1000);
    expect(result.medianOrderPrice).toBe(1000);
    expect(result.topProductByQty).toBe('Laptop');
    expect(result.uniqueProductCount).toBe(1);
  });

  test('handles odd number of orders for median calculation', () => {
    const orders = [
      { id: 1, product: 'A', qty: 1, price: 10 }, // 10
      { id: 2, product: 'B', qty: 1, price: 20 }, // 20
      { id: 3, product: 'C', qty: 1, price: 30 }  // 30
    ];
    const result = summarizeOrders(orders);

    expect(result.medianOrderPrice).toBe(20); // middle value
  });

  test('handles tie in product quantities (returns first found)', () => {
    const orders = [
      { id: 1, product: 'A', qty: 5, price: 10 },
      { id: 2, product: 'B', qty: 5, price: 20 }
    ];
    const result = summarizeOrders(orders);

    expect(['A', 'B']).toContain(result.topProductByQty);
  });
});