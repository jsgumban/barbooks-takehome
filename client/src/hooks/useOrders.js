import { useState, useEffect, useCallback } from 'react';

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productFilter, setProductFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');

  const fetchOrders = useCallback(async (page = 1, filter = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter) params.append('product', filter);
      params.append('limit', '10');
      params.append('offset', ((page - 1) * 10).toString());
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders?${params}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      
      setOrders(data.orders || data);
      setTotalPages(Math.ceil((data.total || data.length) / 10));
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [productFilter]);

  useEffect(() => {
    fetchOrders(1, debouncedFilter);
    setCurrentPage(1);
  }, [debouncedFilter, fetchOrders]);

  const handlePageChange = useCallback((page) => {
    fetchOrders(page, debouncedFilter);
  }, [fetchOrders, debouncedFilter]);

  const handleFilterChange = useCallback((filter) => {
    setProductFilter(filter);
  }, []);

  return { 
    orders, 
    loading, 
    error, 
    currentPage,
    totalPages,
    productFilter,
    refetch: () => fetchOrders(currentPage, debouncedFilter),
    onPageChange: handlePageChange,
    onFilterChange: handleFilterChange
  };
}

export default useOrders;