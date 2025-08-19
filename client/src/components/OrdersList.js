import React, { useState } from 'react';

function OrdersList({ orders, loading, error, onFilterChange, onPageChange, currentPage, totalPages, productFilter }) {
  return (
    <div className="card">
      <div className="card-header bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-0">Recent Orders</h2>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Filter by product..."
              value={productFilter || ''}
              onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
              style={{ width: '200px' }}
            />
          </div>
        </div>
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
          <div className="alert alert-info m-3">
            {productFilter ? `No orders found matching "${productFilter}".` : 'No orders found.'}
          </div>
        )}
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted small">
              Page {currentPage} of {totalPages}
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                disabled={currentPage <= 1}
                onClick={() => onPageChange && onPageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`btn btn-sm ${
                      pageNum === currentPage ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => onPageChange && onPageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange && onPageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersList;