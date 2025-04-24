import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { Grocery } from "./pages/Grocery";
import AddNewDrawer from "./components/AddNewDrawer";
import EditDrawer from "./components/EditDrawer";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Grocery />}>
              <Route path="add" element={<AddNewDrawer/>} />
              <Route path=":id" element={<EditDrawer />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;

