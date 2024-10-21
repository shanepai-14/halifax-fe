import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';


// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes], {basename: "/halifax-fe"});

export default router;