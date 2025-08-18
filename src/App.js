import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import PrivacyPolicy from "./components/PrivacyPolicy";
import Contact from './pages/Contact';
import Login from './Admin/login';
import Admin from './Admin/DashBoard';
import Customers from './Admin/Customers'
import Categories from './Admin/Categories';
import AdminProducts from './Admin/Products';
import AdminLayout from './Admin/AdminLayout';
import Sidebar from './Admin/SideBar';
import PrivateRoute from './Admin/PrivateRoute';



function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          } />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/sidebar" element={<Sidebar />} />

        </Routes>
      </div>
      <Footer />
     
    </>
  );
}

export default App;
