import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const RecruitmentRoutes = lazy(() => import('./recruitment/routes'));
const HrmsRoutes = lazy(() => import('./hrms/routes'));
const PerformanceRoutes = lazy(() => import('./performance/routes'));
const Auth = lazy(() => import('./auth'));

// Central route configuration
export const routes: RouteObject[] = [
  { 
    path: '/',
    element: <Navigate to="/hrms" replace />
  },
  { 
    path: '/recruitment/*',
    element: <Suspense fallback={<div>Loading...</div>}><RecruitmentRoutes /></Suspense>
  },
  { 
    path: '/hrms/*',
    element: <Suspense fallback={<div>Loading...</div>}><HrmsRoutes /></Suspense>
  },
  { 
    path: '/performance/*',
    element: <Suspense fallback={<div>Loading...</div>}><PerformanceRoutes /></Suspense>
  },
  { 
    path: '/auth/*',
    element: <Suspense fallback={<div>Loading...</div>}><Auth /></Suspense>
  }
];
