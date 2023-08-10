import React, { useEffect } from 'react';
import './App.css';
import Horses from './features/horses/Horses';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/root/Root';
import Homepage from './pages/homepage/Homepage';
import Horse from './features/horses/Horse';
import { useDispatch, useSelector } from 'react-redux';
import { loadHorses } from './features/horses/horsesSlice';
import ErrorHandler from './components/error-handler/ErrorHandler';
import Login from './features/user/Login';
import { checkSession, selectUser } from './features/user/userSlice';
import Admin from './pages/admin/Admin';
import ScrollToTop from "react-scroll-to-top";

const Authenticater =  ({ children }) => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkSession())
  },[])
  
  const user = useSelector(selectUser)
  if (user.role === 'admin' || user.role === 'guest') {
    return children
  } else {
    return <ErrorHandler message={"You are not supposed to be here!"} />
  }
}
//Create Router
const router = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Root />}>
    <Route path="/" element={<Homepage />} />
    <Route path="/admin" element={<Authenticater><Admin /></Authenticater>} />
    <Route path="/login" element={<Login />} />
    <Route path="/horses" element={<Horses />} />
    <Route path='/horses/:horseName' element={<Horse />}  />
    <Route path='/*' element={<ErrorHandler message="This Page is currently under construction" />} />
  </Route>


))
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadHorses())
  }, [dispatch])

  return (

    <div className="App">
      
        <RouterProvider router={router} />
      <ScrollToTop smooth/>

    </div>




  );
}

export default App;
