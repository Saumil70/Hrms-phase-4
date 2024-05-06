import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";
import LeaveList from "./Components/Admin/LeaveList";
import UserPage from "./Components/User/UserPage";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import UserHomePage from "./Components/User/UserHomePage";
import AdminTimeSheet from "./Components/Admin/AdminTimesheet";
import UserTimeSheet from "./Components/User/UserTimeSheet";
import Home from "./Components/Home";
import SidebarComponent from "./Components/SideBar";


const router = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
    </Route>
    <Route path="/Login" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/AdminHomePage" element={<App />}>
      <Route index element={<SidebarComponent />} />
      <Route index element={<AdminHomePage />} />
    </Route>
    <Route path="/UserHomePage" element={<App />}>
      <Route index element={<SidebarComponent />} />
      <Route index element={<UserHomePage/>} />
    </Route>
    <Route path="/AdminTimeSheet" element={<AdminTimeSheet />} />
    <Route path="/UserTimeSheet/:userId" element={<UserTimeSheet />} />
    <Route
      path="/LeaveManagement"
      element={
        localStorage.getItem("isLoggedIn") === "true" ? (
          <LeaveList />
        ) : (
          <Navigate to="/Login" />
        )
      }
    />
    <Route
      path="/UserPage/:userId"
      element={
        localStorage.getItem("isLoggedIn") === "true" ? (
          <UserPage />
        ) : (
          <Navigate to="/Login" />
        )
      }
    />
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>{router}</Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
