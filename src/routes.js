
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import CategoriesListing from 'src/pages/CategoriesList';
import AddCategories from 'src/pages/AddCategories';
import EditCategory from 'src/pages/EditCategories';
import ThemeList from 'src/pages/ThemesList';
import AddThemes from 'src/pages/AddThemes';
import EditTheme from 'src/pages/EditThemes';
import IconList from 'src/pages/IconsList';
import AddIcon from 'src/pages/AddIcon';
import EditIcon from 'src/pages/EditIcons';


const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'categories', element: <CategoriesListing /> },
      { path: 'add-categories', element: <AddCategories /> },
      { path: 'edit-category/:categoryId', element: <EditCategory /> },
      { path: 'themes', element: <ThemeList /> },
      { path: 'add-themes', element: <AddThemes /> },
      { path: 'edit-theme/:themeId', element: <EditTheme /> },
      { path: 'icons/:themeId', element: <IconList /> },
      { path: 'add-icons/:themeId', element: <AddIcon /> },
      { path: 'edit-icon/:themeId/:iconId', element: <EditIcon /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
