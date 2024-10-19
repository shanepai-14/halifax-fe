// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';



const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/',
      icon: LoginOutlined,
  
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: ProfileOutlined,
     
    }
  ]
};

export default pages;
