// assets
import { DashboardOutlined ,ShoppingCartOutlined ,DropboxOutlined ,AreaChartOutlined ,UserOutlined ,ProductOutlined} from '@ant-design/icons';




// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Sales',
      type: 'item',
      url: '/sales',
      icon: ShoppingCartOutlined ,
      breadcrumbs: false
    },
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: DropboxOutlined ,
      breadcrumbs: false
    },
    {
      id: 'product',
      title: 'Product',
      type: 'item',
      url: '/product',
      icon: ProductOutlined  ,
      breadcrumbs: false
    },
    {
      id: 'supplier',
      title: 'Supplier',
      type: 'item',
      url: '/supplier',
      icon: AreaChartOutlined ,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: UserOutlined  ,
      breadcrumbs: false
    },
   

  ]
};

export default dashboard;
