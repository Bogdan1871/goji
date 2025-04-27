import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth-context';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { loginSchema, LoginSchema } from '@/lib/validators/login';

const Login: FC = () => {
  const { login } = useAuth();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className="w-96 mx-auto p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" minLength={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">Login</Button>
          </form>
        </Form>
        <p className="text-sm text-center mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">
            Don't have an account?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;