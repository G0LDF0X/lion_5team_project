import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './layouts/Root'
import Home from './pages/home'
import BoardPage from './pages/Board'
import UserProfileScreen from './pages/UserProfile'
import MyReviewScreen from './pages/MyReview'
import UserSettingScreen from './pages/UserSetting'
import SellerSettingScreen from './pages/SellerSetting'

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
