import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export interface GroceryItem {
  _id: string;
  name: string;
  quantity: number;
  inStock: boolean;
  expireDate: string;
  addDate: string;
}

const useGrocery = () => {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const markOutOfStock = async () => {
    if (!selectedIds.length) return;
  
    try {
      await axios.put('/groceries', {
        filter: { _id: { $in: selectedIds } },
        update: { inStock: false },
      });
      toast.success(`${selectedIds.length} items marked as out of stock`);
      clearSelection();
      fetchGroceries();
    } catch (err) {
      toast.error('Failed to mark items out of stock +' + err);
    }
  };

  const markInStock = async () => {
    if (!selectedIds.length) return;
  
    try {
      await axios.put('/groceries', {
        filter: { _id: { $in: selectedIds } },
        update: { inStock: true },
      });
      toast.success(`${selectedIds.length} items marked as out of stock`);
      clearSelection();
      fetchGroceries();
    } catch (err) {
      toast.error('Failed to mark items out of stock: ' + err);
    }
  };

  const fetchGroceries = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/groceries', {
        params: { page, limit, search },
      });
      setGroceries(res.data?.items || []);
      setTotal(res.data?.total || 0);
    } catch (error) {
      console.error('Failed to fetch groceries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, [page, search]);

  return {
    groceries,
    page,
    setPage,
    search,
    limit,
    setSearch,
    loading,
    total,
    selectedIds,
    toggleSelect,
    clearSelection,
    setSelectedIds,
    markOutOfStock,
    markInStock
  };
}

export default useGrocery;