import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FC, useEffect } from 'react';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from '@/components/ui/form';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  quantity: z.coerce.number().min(1),
});

type GroceryForm = z.infer<typeof schema>;

type EditDrawerProps = {
  queryClient: QueryClient
}

const EditDrawer: FC<EditDrawerProps> = ({
  queryClient
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const closeDrawer = () => navigate('/');

  const form = useForm<GroceryForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      quantity: 1,
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ['drawerDetails', [id]],
    queryFn: async () => {
      const { data } = await axios.get(`/groceries/${id}`);

      return data;
    }
  })

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const { mutateAsync: updateGroceryitem } = useMutation({
    mutationFn: async (data: GroceryForm) => {
      await axios.put(`/groceries/${id}`, data);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
      toast.success('Item updated');
      navigate('/');
    },
    onError: () => {
      toast.error('Update failed');
    }
  })

  const onSubmit = async (data: GroceryForm) => {
    updateGroceryitem(data)
  };

  return (
    <Drawer direction="right" open onOpenChange={(open) => !open && navigate('/')}>
      <DrawerContent>
        <div className="p-4">
          <DrawerTitle className="flex justify-between items-center gap-4 mb-12">
            Edit Grocery Item
            <Button
              size='sm'
              className="cursor-pointer"
              onClick={closeDrawer}
            >
              Close
            </Button>
          </DrawerTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-12 cursor-pointer">Update</Button>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default EditDrawer;
