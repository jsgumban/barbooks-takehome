import React, { useState } from 'react';

function OrderForm({ onOrderAdded }) {
  const [newOrder, setNewOrder] = useState({ product: '', qty: '', price: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newOrder.product || !newOrder.qty || !newOrder.price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: newOrder.product,
          qty: parseInt(newOrder.qty),
          price: parseFloat(newOrder.price)
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create order');
      }

      // reset form and notify parent
      setNewOrder({ product: '', qty: '', price: '' });
      if (onOrderAdded) {
        onOrderAdded();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card mb-5">
      <div className="card-header bg-light">
        <h2 className="card-title mb-0">Add New Order</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Product</label>
              <input
                type="text"
                className="form-control"
                value={newOrder.product}
                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={newOrder.qty}
                onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={newOrder.price}
                onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                placeholder="Enter price"
                min="0.01"
                required
              />
            </div>
            <div className="col-md-3">
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : 'Add Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;