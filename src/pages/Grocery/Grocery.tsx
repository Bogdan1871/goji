import useGrocery, { GroceryItem } from './useGrocery';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const Grocery: FC = () => {
  const navigate = useNavigate();
  const {
    groceries,
    selectedIds,
    page,
    setSelectedIds,
    toggleSelect,
    clearSelection,
    setPage,
    search,
    setSearch,
    total,
    loading,
    limit,
    markOutOfStock,
    markInStock
  } = useGrocery();
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Groceries</h1>
        <div className='flex items-center gap-4 flex-wrap'>
          <Input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-42"
          />
          <Button
            variant="secondary"
            className='cursor-pointer'
            onClick={() => navigate('/add')}
          >
            + Add Item
          </Button>

          <div className='flex items-center gap-4'>
            {selectedIds.length > 0 && (
              <Button
                size="sm"
                className='cursor-pointer'
                onClick={markInStock}
              >
                In Stock
              </Button>
            )}

            {selectedIds.length > 0 && (
              <Button
                size="sm"
                variant="destructive"
                className='cursor-pointer'
                onClick={markOutOfStock}
              >
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-300px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-10'>
                <Checkbox
                  className='cursor-pointer'
                  checked={selectedIds.length === groceries.length && groceries.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedIds(groceries.map((item) => item._id));
                    } else {
                      clearSelection();
                    }
                  }}
                />
              </TableHead>
              <TableHead className='flex-1'>Name</TableHead>
              <TableHead className='w-32'>Quantity</TableHead>
              <TableHead className='w-40'>In Stock</TableHead>
              <TableHead className='w-40'>Added</TableHead>
              <TableHead className='w-40'>Expire Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='overflow-y-auto'>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : groceries.length > 0 ? (
              groceries.map((item: GroceryItem) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Checkbox
                      className='cursor-pointer'
                      checked={selectedIds.includes(item._id)}
                      onCheckedChange={() => toggleSelect(item._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/${item._id}`} className="text-blue-600 hover:underline">
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.inStock ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{new Date(item.addDate).toLocaleDateString()}</TableCell>
                  <TableCell>{item.expireDate?.split('T')[0]}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No items found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-6 justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='cursor-pointer'
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              aria-disabled={page <= 1}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm">Page {page} of {totalPages}</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className='cursor-pointer'
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              aria-disabled={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Outlet />
    </div>
  );
}

export default Grocery;