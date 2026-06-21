import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PropertyProvider>
          <div className="flex flex-col min-h-screen">
            {/* Airbnb-style Sticky Navbar */}
            <Navbar />
            
            {/* Principal Router contents */}
            <main className="flex-grow bg-slate-50">
              <AppRoutes />
            </main>
            
            {/* Global Footer */}
            <Footer />
          </div>
        </PropertyProvider>
      </AuthProvider>
    </Router>
  );
}
