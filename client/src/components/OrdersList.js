import React from 'react';

function OrdersList({ orders, loading, error }) {
  return (
    <div className="card">
      <div className="card-header bg-light">
        <h2 className="card-title mb-0">Recent Orders</h2>
      </div>
      <div className="card-body p-0">
        {loading && <div className="alert alert-info m-3">Loading orders...</div>}
        {error && <div className="alert alert-danger m-3">Error: {error}</div>}
        {orders.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="fw-semibold">{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.qty}</td>
                    <td>${order.price.toFixed(2)}</td>
                    <td className="fw-semibold">${(order.qty * order.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && !error && orders.length === 0 && (
          <div className="alert alert-info m-3">No orders found.</div>
        )}
      </div>
    </div>
  );
}

export default OrdersList;