import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Button } from "./ui/button";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from "./ui/input";
import { QueryClient, useMutation } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().min(1, 'Required'),
  quantity: z.coerce.number().min(1, 'Must be at least 1'),
  expireDate: z.string().optional(),
});

type GroceryForm = z.infer<typeof schema>;

type AddNewDrawerProps = {
  queryClient: QueryClient
}

const AddNewDrawer: FC<AddNewDrawerProps> = ({
  queryClient
}) => {
  const navigate = useNavigate();
  const closeDrawer = () => navigate('/');

  const form = useForm<GroceryForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      quantity: 1,
      expireDate: '',
    },
  });

  const { mutateAsync: createNewItem } = useMutation({
    mutationFn: async (data: GroceryForm) => {
      await axios.post('/groceries', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
      toast.success('Item added');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to add item');
    }
  })

  const onSubmit = async (data: GroceryForm) => {
    createNewItem(data);
  };

  return (
    <Drawer direction="right" open={true} onOpenChange={(open: boolean) => !open && closeDrawer()}>
      <DrawerContent>
        <div className="p-4">
          <DrawerTitle className="flex justify-between items-center gap-4 mb-12">
            Add Grocery Item
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
              <FormField
                control={form.control}
                name="expireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expire Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-12 cursor-pointer">Create</Button>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddNewDrawer;