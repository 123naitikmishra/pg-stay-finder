import React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;
