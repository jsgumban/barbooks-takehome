export interface Order {
  id: number;
  product: string;
  qty: number;
  price: number;
}

export interface Summary {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
}