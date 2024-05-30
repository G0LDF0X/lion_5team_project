import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './layouts/Root'
import Home from './pages/home'
import BoardPage from './pages/Board'
import UserProfileScreen from './pages/UserProfile'
import MyReviewScreen from './pages/MyReview'
import UserSettingScreen from './pages/UserSetting'
import SellerSettingScreen from './pages/SellerSetting'
import AdminManageScreen from './pages/Admin'
import ProductDetail from './pages/Product'
import ProductsScreen from './pages/Products'
import CreateReviewScreen from './pages/CreateReview'
import QAScreen from './pages/QnA'
import CreateQnAScreen from './pages/CreateQnA'
import QAUpdateScreen from './pages/UpdateQnA'
import QADetailScreen from './pages/QnaDetail'
import CartScreen from './pages/Cart'
import MyShoppingScreen from './pages/MyShopping'
import OtherUserProfile from './pages/OtherUsers'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    exact: true,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path:'/board',
        element: <BoardPage />
      },
      {
        path:'/users/profile',
        element: <UserProfileScreen />
      },
      {
        path:'/users/myreview',
        element: <MyReviewScreen/>
      },
      {
        path:'/users/setting',
        element: <UserSettingScreen/>
      },
      {
        path:'/seller/manage',
        element: <SellerSettingScreen/>
      },
      {
        path:'/admin/manage',
        element: <AdminManageScreen/>
      },
      {
        path:'/items/detail/:id',
        element: <ProductDetail/>
      },
      {
        path:'/items',
        element: <ProductsScreen/>
      },
      {
        path:'/items/review/create/:id',
        element: <CreateReviewScreen/>
      },
      {
        path:'/qna',
        element: <QAScreen/>
      },
      {
        path:'/qna/create',
        element: <CreateQnAScreen/>
      },
      {
        path:'/qna/update/:id',
        element: <QAUpdateScreen/>
      },
      {
        path:'/qna/detail/:id',
        element: <QADetailScreen/>
      },
      {
        path:'/cart',
        element: <CartScreen/>
      },
      {
        path:'/users/myshopping',
        element: <MyShoppingScreen/>
      },
      {
        path:'/users/:id',
        element: <OtherUserProfile/>
      }

      
    ]
  }
])



function App() {
  

  return (
    <>
    <RouterProvider router={routers} />
    </>
  )
}

export default App
