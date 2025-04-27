import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useMutation, keepPreviousData, useQuery } from '@tanstack/react-query';

export interface GroceryItem {
  _id: string;
  name: string;
  quantity: number;
  inStock: boolean;
  expireDate: string;
  addDate: string;
}

const useGrocery = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const { mutateAsync: markOutOfStock } = useMutation({
    mutationFn: async () => {
      await axios.put('/groceries', {
        filter: { _id: { $in: selectedIds } },
        update: { inStock: false },
      });
    },
    onSuccess: () => {
      toast.success(`${selectedIds.length} items marked as out of stock`);
      clearSelection();
      fetchGroceries();
    },
    onError: () => {
      toast.error('Failed to mark items out of stock');
    },
  })

  const { mutateAsync: markInStock } = useMutation({
    mutationFn: async () => {
      await axios.put('/groceries', {
        filter: { _id: { $in: selectedIds } },
        update: { inStock: true },
      });
    },
    onSuccess: () => {
      toast.success(`${selectedIds.length} items marked as in stock`);
      clearSelection();
      fetchGroceries();
    },
    onError: () => {
      toast.error('Failed to mark items in stock');
    },
  })

  const { data: groceries, isLoading, refetch: fetchGroceries } = useQuery({
    queryKey: ['groceries', { page, search, limit }],
    queryFn: async () => {
      const res = await axios.get('/groceries', {
        params: { page, limit, search },
      });

      return res.data;
    },
    initialData: keepPreviousData,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    fetchGroceries();
  }, [page, search]);

  return {
    groceries: groceries?.items || [],
    page,
    setPage,
    search,
    limit,
    setSearch,
    loading: isLoading,
    total: groceries?.total || 0,
    selectedIds,
    toggleSelect,
    clearSelection,
    setSelectedIds,
    markOutOfStock,
    markInStock
  };
}

export default useGrocery;