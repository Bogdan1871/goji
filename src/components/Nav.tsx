import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/context/auth-context';

export default function Nav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-white shadow-md flex gap-4 justify-between items-center">
      <div className='flex items-center gap-4 font-bold'>
        <Link to="/">Home</Link>
      </div>
      
      <div>
        <Button variant="outline" className="ml-auto cursor-pointer" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}