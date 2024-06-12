import './App.css';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import RootLayout from './layouts/Root';
import Home from './pages/home';
import BoardPage from './pages/Board';
import UserProfileScreen from './pages/UserProfile';
import MyReviewScreen from './pages/MyReview';
import UserSettingScreen from './pages/UserSetting';
import SellerSettingScreen from './pages/SellerSetting';
import AdminManageScreen from './pages/Admin';
import ProductDetail from './pages/Product';
import ProductsScreen from './pages/Products';
import UpdateReviewScreen from './pages/UpdateReview';
import QAScreen from './pages/QnA';
import CreateQnAScreen from './pages/CreateQnA';
import QAUpdateScreen from './pages/UpdateQnA';
import QADetailScreen from './pages/QnaDetail';
import CartScreen from './pages/Cart';
import MyShoppingScreen from './pages/MyShopping';
import OtherUserProfile from './pages/OtherUsers';
import ShippingScreen from './pages/Shipping';
import BoardDetailModal from './modals/BoardDetail';
import OrderDetail from './components/profilescreen/OrderDetail';
import Test from './pages/test';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> ,
        children: [
          { path: '/:id', element: <BoardDetailModal /> }
        ]
      },
      { path: '/board', element: <BoardPage /> ,
        children: [
          { path: '/board/:id', element: <BoardDetailModal /> }
        ]
      },
      { path: '/users/profile', element: <UserProfileScreen /> },
      { path: '/users/myreview', element: <MyReviewScreen /> },
      { path: '/users/setting', element: <UserSettingScreen /> },
      { path: '/seller/manage', element: <SellerSettingScreen /> },
      { path: '/admin/manage', element: <AdminManageScreen /> },
      { path: '/items/detail/:id', element: <ProductDetail /> },
      { path: '/items', element: <ProductsScreen /> },
      { path: '/items/review/update/:id', element: <UpdateReviewScreen /> },
      { path: '/qna', element: <QAScreen /> },
      { path: '/qna/create', element: <CreateQnAScreen /> },
      { path: '/qna/update/:id', element: <QAUpdateScreen /> },
      { path: '/qna/detail/:id', element: <QADetailScreen /> },
      { path: '/cart', element: <CartScreen /> },
      { path: '/users/myshopping', element: <MyShoppingScreen /> },
      { path: '/users/:id', element: <OtherUserProfile /> },
      { path: '/shipping', element: <ShippingScreen /> },
      { path: '/order/detail/:id', element: <OrderDetail /> },
      { path: '/test', element: <Test /> }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
