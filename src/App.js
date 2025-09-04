import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Contact from "./pages/Contact";

// Admin pages
import Login from "./Admin/Login";
import Dashboard from "./Admin/DashBoard";
import Categories from "./Admin/Categories";
import AdminProducts from "./Admin/Products";
import Inquiries from "./Admin/Inquiries";
import Testimonials from "./Admin/Testimonials";
import AdminLayout from "./Admin/AdminLayout";
import PrivateRoute from "./Admin/PrivateRoute";

function App() {
  const location = useLocation();

  // Show Navbar/Footer only on public routes (not inside /admin/* except /admin/login)
  const showPublicLayout =
    !location.pathname.startsWith("/admin") || location.pathname === "/admin/login";

  return (
    <>
      {showPublicLayout && <Navbar />}
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin routes (protected) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="testimonials" element={<Testimonials />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
