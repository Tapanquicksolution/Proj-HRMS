import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';

// Components
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));
const Login = lazy(() => import('./auth/Login'));

// Module routes
const RecruitmentRoutes = lazy(() => import('./recruitment/routes'));
const HrmsRoutes = lazy(() => import('./hrms/routes'));
const PerformanceRoutes = lazy(() => import('./performance/routes'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Auth routes */}
            <Route path="/auth">
              <Route path="login" element={<Login />} />
            </Route>
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/hrms/*" element={<HrmsRoutes />} />
                <Route path="/recruitment/*" element={<RecruitmentRoutes />} />
                <Route path="/performance/*" element={<PerformanceRoutes />} />
              </Route>
            </Route>
            
            {/* Redirect to login if not authenticated */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
