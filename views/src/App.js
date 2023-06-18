import React, { useEffect } from 'react';
import './App.css';
import Horses from './features/horses/Horses';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/root/Root';
import Homepage from './pages/homepage/Homepage';
import Horse from './features/horses/Horse';
import { useDispatch } from 'react-redux';
import { loadHorses } from './features/horses/horsesSlice';
import ScrollTop from './components/scrollTop/ScrollTop';
import ErrorHandler from './components/error-handler/ErrorHandler';

//Create Router
const router = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Root />} errorElement={<ErrorHandler message={"OH NO!"}/>}>
    <Route path="/" element={<Homepage />} />
    <Route path="/horses" element={<Horses />} />
    <Route path='/horses/:horseName' element={<Horse />} errorElement={<ErrorHandler message="Horse Not Found"  />}/>   
    <Route path='/*' element={<ErrorHandler message="This Page is currently under construction"/>} />  
 </Route>


))
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadHorses())
  }, [dispatch])

  return (
    <ScrollTop>
      <RouterProvider router={router} />
    </ScrollTop>

  );
}

export default App;
