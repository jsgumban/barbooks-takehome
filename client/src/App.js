import React from 'react';
import useSummary from './hooks/useSummary';
import useOrders from './hooks/useOrders';
import SummaryCards from './components/SummaryCards';
import OrderForm from './components/OrderForm';
import OrdersList from './components/OrdersList';
import './App.css';

function App() {
  const { data: summary, loading: summaryLoading, error: summaryError, refetch: refetchSummary } = useSummary();
  const { orders, loading: ordersLoading, error: ordersError, refetch: refetchOrders } = useOrders();

  const handleOrderAdded = async () => {
    // refresh both summary and orders when a new order is added
    await Promise.all([refetchSummary(), refetchOrders()]);
  };

  return (
    <div className="App">
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="text-center mb-5 text-primary">BarBooks Orders Dashboard</h1>

            {/* Summary Section */}
            <div className="mb-5">
              <h2 className="border-bottom border-primary pb-2 mb-4">Order Summary</h2>
              <SummaryCards 
                summary={summary} 
                loading={summaryLoading} 
                error={summaryError} 
              />
            </div>

            {/* Add New Order Form */}
            <OrderForm onOrderAdded={handleOrderAdded} />

            {/* Orders List */}
            <OrdersList 
              orders={orders} 
              loading={ordersLoading} 
              error={ordersError} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;