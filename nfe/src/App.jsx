import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './layouts/Root'
import Home from './pages/home'
import BoardPage from './pages/Board'


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
