import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Start";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";
import Captainlogin from "./Captainlogin";
import Captainsignup from "./Captainsignup";
import Home from "./Home";
import UserProtectWrapper from "./UserProtectWrapper";
import { UserLogout } from "./UserLogout";
import CaptainHome from "./CaptainHome";
import CaptainProtectWrapper from "./CaptainProtectWrapper";
import CaptainLogout from "./CaptainLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<Captainsignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
         <Route path="/captain-logout" element={<CaptainLogout />} />
      </Routes>
    </div>
  );
};

export default App;
