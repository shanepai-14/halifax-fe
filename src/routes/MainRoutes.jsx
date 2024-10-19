import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import MinimalLayout from 'layout/MinimalLayout';


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
const ProductPage = Loadable(lazy(() => import('pages/product/index')));
const Product = Loadable(lazy(() => import('pages/product/product')))
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// const MainRoutes = {
//   path: '/',
//   element: <Dashboard />,
//   children: [
//     {
//       path: 'dashboard',
//           element: <DashboardDefault />
     
//     },
//     {
//       path: 'inventory',
//       element: <InventoryPage />,
//       children: [
//         {
//           index: true,
//           element: <Inventory />
//         },
//       ]
//     },
//     {
//       path: 'supplier',
//       element: <SupplierPage />,
//       children: [
//         {
//           index: true,
//           element: <Supplier />
//         },
//       ]
//     },
//     {
//       path: 'sales',
//       element: <SalesPage />,
//       children: [
//         {
//           index: true,
//           element: <Sales />
//         },
//         {
//           path: 'newOrder',
//           element: <NewOrder />
//         },
//         {
//           path: 'invoice-preview',
//           element: <InvoicePreview />
//         }
//       ]
//     },
//     {
//       path: 'account',
//       element: <AccountPage />,
//       children: [
//         {
//           index: true,
//           element: <Account />
//         },
      
//       ]
//     },
//     {
//       path: 'product',
//       element: <ProductPage />,
//       children: [
//         {
//           index: true,
//           element: <Product />
//         },
      
//       ]
//     }

//   ]
// };
const MainRoutes= {
  path: '/',
  children: [
    {
      path: '/',
      element: <Dashboard />,
      children: [
        {
          index: true,
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
        },
        {
          path: 'product',
          element: <ProductPage />,
          children: [
            {
              index: true,
              element: <Product />
            },
          ]
        }
      ]
    },
    {
      element: <MinimalLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        }
      ]
    }
  ]
};
export default MainRoutes;
