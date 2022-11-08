import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/useAuth.js';
import ProtectedRoute from './components/auth/ProtectedRoute.js';
import Layout from './components/layouts/Layout.js';
import MyModules from './components/pages/MyModules.js';
import MySecrets from './components/pages/MySecrets.js';
import FauxLogin from './components/pages/FauxLogin.js';
import PageNotFound from './components/pages/404.js';
import './App.scss';

export default function App() {
  // View ----------------------------------------
  return (
    <BrowserRouter>
      <AuthProvider>  
        <Layout>
          <Routes>
            <Route path ='/' element={<ProtectedRoute><MyModules /></ProtectedRoute>} />
            <Route path='/secrets' element={<ProtectedRoute><MySecrets /></ProtectedRoute>} />
            <Route path='/login' element={<FauxLogin />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}