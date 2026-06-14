import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './components/admin/AdminLayout';

// Auth Pages
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Services from './pages/admin/Services';
import Contacts from './pages/admin/Contacts';
import Testimonials from './pages/admin/Testimonials';


// Public Pages
import Home from './pages/public/Home';
import PublicLayout from './components/public/PublicLayout';
import PublicService from './pages/public/Services';
import PublicTestimonials from './pages/public/Testimonials';
import About from './pages/public/About'; // Banayenge abhi
import PublicContact from './pages/public/Contact'; // Banayenge abhi
import ScrollToTop from './components/ScrollToTop';

// Route Protector
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route index element={<Navigate to="dashboard" replace />} />


        </Route>



        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<PublicService />} />
          <Route path="testimonials" element={<PublicTestimonials />} />
          <Route path="contact" element={<PublicContact />} />
        </Route>
      </Routes>
    </Router>
  );
}