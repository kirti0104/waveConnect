import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import {ProtectedRoute,ProtectedLoginRoute} from "./utils/protectedRoutes";
import Profile from "./pages/Profile";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Preferences from "./pages/Preferences";
import InviteFriend from "./pages/InviteFriend";
import Friends from "./pages/Friends";
import CreateWaves from "./pages/CreateWaves";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import AutoLogout from "./components/autoLogout";


const queryClient = new QueryClient();
const token = Cookies.get("authToken")
//console.log("////",store.getState());
const router = createBrowserRouter([
  {
    path:'/adminSignup',
    element:<AdminSignup/>
  },
   {
    path:'/adminLogin',
    element:<AdminLogin/>
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: 
    <ProtectedLoginRoute>
      <Login />
      </ProtectedLoginRoute>,
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },
  
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <AutoLogout> 
        <Layout />
        </AutoLogout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>,
       
      },
      {
        path: "profile/:userId",
        element: <Profile/>,
      },
      {
        path: "settings",
        element: <div>Settings Content</div>,
      },
      {
        path: "preferences",
        element: <Preferences />,
     },
      {
        path: "inviteFriend",
        element: <InviteFriend />,
     },
       {
        path: "friends",
        element: <Friends />,
     },
     {
    path: "createWaves",
    element: <CreateWaves />,
  },
   {
    path: "changePassword",
    element: <ChangePassword/>,
  },
    ],
  },
      
  {
    path: "*", // all the non-existing path of routes
    element: (
      <Navigate to={token ? "/app/dashboard" : "/login"} />
    ),
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <AutoLogout> */}
        <RouterProvider router={router} />
        <ToastContainer/>
        {/* </AutoLogout> */}
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
