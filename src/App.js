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
import Admin from './Admin/Admin';
import Dashboard from './Admin/DashBoard';
import Customers from './Admin/Customers';
import Categories from './Admin/Categories';
import AdminProducts from './Admin/Products';
import Inquiries from './Admin/Inquiries';
import Testimonials from './Admin/Testimonials'
import AdminLayout from './Admin/AdminLayout';
import PrivateRoute from './Admin/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Admin routes with layout and protection */}
          <Route path="/admin/" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="testimonials" element={<Testimonials />} />

            {/* Add more admin pages here */}
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;