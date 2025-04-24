import { Outlet } from 'react-router-dom';
import Nav from '@/components/Nav';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Nav />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}