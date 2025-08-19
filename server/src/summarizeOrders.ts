import { Order, Summary } from './types';

const summarizeOrders = (orders: Order[]): Summary => {
  if (!orders || orders.length === 0) {
    return {
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: '',
      uniqueProductCount: 0
    };
  }

  let totalRevenue = 0;
  const prices: number[] = [];
  const productTotals: Record<string, number> = {};
  const uniqueProducts = new Set<string>();

  // go through each order
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const orderValue = order.qty * order.price;
    
    totalRevenue += orderValue;
    prices.push(orderValue);
    
    // keep track of quantities per product
    productTotals[order.product] = (productTotals[order.product] || 0) + order.qty;
    uniqueProducts.add(order.product);
  }

  // sort prices to find median
  prices.sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  const medianOrderPrice = prices.length % 2 === 0 
    ? (prices[mid - 1] + prices[mid]) / 2 
    : prices[mid];

  // find which product has the most quantity
  let topProduct = '';
  let highestQty = 0;
  for (const product in productTotals) {
    if (productTotals[product] > highestQty) {
      highestQty = productTotals[product];
      topProduct = product;
    }
  }

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty: topProduct,
    uniqueProductCount: uniqueProducts.size
  };
}

export { summarizeOrders };