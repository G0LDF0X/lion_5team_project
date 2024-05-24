import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './layouts/Root'
import Home from './pages/home'
import BoardPage from './pages/Board'
import UserProfileScreen from './pages/UserProfile'
import MyReviewScreen from './pages/MyReview'


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
