import React from 'react';

function SummaryCards({ summary, loading, error }) {
  if (loading) {
    return <div className="alert alert-info">Loading summary...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6 col-lg-3">
        <div className="card border-start border-primary border-4 h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-2">Total Revenue</h5>
            <h2 className="card-text text-primary mb-0">${summary.totalRevenue.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="card border-start border-success border-4 h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-2">Median Order Price</h5>
            <h2 className="card-text text-success mb-0">${summary.medianOrderPrice.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="card border-start border-warning border-4 h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-2">Top Product by Quantity</h5>
            <h2 className="card-text text-warning mb-0">{summary.topProductByQty}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="card border-start border-info border-4 h-100">
          <div className="card-body">
            <h5 className="card-title text-muted mb-2">Unique Products</h5>
            <h2 className="card-text text-info mb-0">{summary.uniqueProductCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;