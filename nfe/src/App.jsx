import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import HomeScreen from './pages/home'
import RootLayout from './layouts/Root'
import Home from './pages/home'


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
      // {
      //   path:'/post',
      //   element: <PostForm />
      // }
      
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
