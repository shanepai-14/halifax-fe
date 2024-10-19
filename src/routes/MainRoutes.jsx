import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';



const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const SalesPage = Loadable(lazy(() => import('pages/sales/index')));
const NewOrder = Loadable(lazy(() => import('pages/sales/newOrder')));
const Sales = Loadable(lazy(() => import('pages/sales/sales')));
const InventoryPage = Loadable(lazy(() => import('pages/inventory/index')));
const Inventory = Loadable(lazy(() => import('pages/inventory/inventory')));
const SupplierPage = Loadable(lazy(() => import('pages/supplier/index')));
const Supplier = Loadable(lazy(() => import('pages/supplier/supplier')));
const AccountPage = Loadable(lazy(() => import('pages/account/index')));
const Account = Loadable(lazy(() => import('pages/account/account')))
const InvoicePreview = Loadable(lazy(() => import('pages/sales/invoicePreview')))
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
      element: <InventoryPage />,
      children: [
        {
          index: true,
          element: <Inventory />
        },
      ]
    },
    {
      path: 'supplier',
      element: <SupplierPage />,
      children: [
        {
          index: true,
          element: <Supplier />
        },
      ]
    },
    {
      path: 'sales',
      element: <SalesPage />,
      children: [
        {
          index: true,
          element: <Sales />
        },
        {
          path: 'newOrder',
          element: <NewOrder />
        },
        {
          path: 'invoice-preview',
          element: <InvoicePreview />
        }
      ]
    },
    {
      path: 'account',
      element: <AccountPage />,
      children: [
        {
          index: true,
          element: <Account />
        },
      
      ]
    }

  ]
};

export default MainRoutes;
