import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Pages
import Home from '../pages/Home';
import Listings from '../pages/Listings';
import PropertyDetails from '../pages/PropertyDetails';
import SearchResults from '../pages/SearchResults';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UserDashboard from '../pages/UserDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

// Protected Route for authenticated users
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold text-xs">
        Authenticating session...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If user tries to access owner/admin dashboard without proper role
    return <Navigate to={currentUser.role === 'Owner' ? '/owner-dashboard' : '/user-dashboard'} replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authenticated User Routes */}
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['User', 'Admin']}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />

      {/* Owner Only Routes */}
      <Route 
        path="/owner-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Admin Only Routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
