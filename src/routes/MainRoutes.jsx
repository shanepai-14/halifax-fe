import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';



const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const SalesPage = Loadable(lazy(() => import('pages/sales/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
          element: <DashboardDefault />
     
    },
    {
      path: 'inventory',
      element: <SamplePage />
    },
    {
      path: 'sales',
      element: <SalesPage />
    },

  ]
};

export default MainRoutes;
