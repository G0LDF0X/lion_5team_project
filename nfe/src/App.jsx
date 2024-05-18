import './App.css'
import Chatbot from './components/Chatbot'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import HomeScreen from './pages/home'
import RootLayout from './pages/Root'
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
