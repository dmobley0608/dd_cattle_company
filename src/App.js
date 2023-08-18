import React, { useEffect } from "react";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/root/Root";
import Homepage from "./pages/homepage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { loadHorses } from "./features/horses/horsesSlice";
import ErrorHandler from "./components/error-handler/ErrorHandler";
import Login from "./pages/user/Login";
import { checkSession, selectUser } from "./features/user/userSlice";
import Admin from "./pages/admin/Admin";
import ScrollToTop from "react-scroll-to-top";
import AboutHorse from "./pages/horse/AboutHorse";
import HorseGallery from "./pages/horse/HorseGallery";
import HorseJournal from "./pages/horse/HorseJournal";
import Horse from "./pages/horse/Horse";
import Horses from "./pages/horse/Horses"
import Register from "./pages/user/Register";

const Authenticater = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, []);

  const user = useSelector(selectUser);
  if (user.role === "admin" || user.role === "guest") {
    return children;
  } else {
    return <ErrorHandler message={"You Must Be Logged In To View This Page!"} />;
  }
};
//Create Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}  >
      <Route path="/" element={<Homepage errorElement={<ErrorHandler message={"Dang! You found a problem!"} />} />} >
        <Route path="/admin" element={<Authenticater><Admin /></Authenticater>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/horses" element={<Horses />} />
        <Route path="/horses/:horseName" element={<Horse />}>
          <Route path="about" element={<AboutHorse />} />
          <Route path="gallery/:mediaType" element={<HorseGallery />} />
          <Route path="journal" element={<HorseJournal />} />
        </Route>
        <Route  path="/*" element={<ErrorHandler message="This Page is currently under construction" />}/>
      </Route>
    </Route>
  )
);
function App() {


  return (
    <div className="App">
      <RouterProvider router={router} />
      <ScrollToTop smooth />
    </div>
  );
}

export default App;
