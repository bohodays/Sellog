import React, { Suspense, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { localData } from "./utils/token";
import { apiGetUserInfo } from "./api/user";
import { userInfoState } from "./recoil/myroom/atoms";

function App() {
  // Code Splitting
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Main = React.lazy(() => import("./pages/Main/Main"));
  const CSQuiz = React.lazy(() => import("./pages/CSQuiz/CSQuiz"));
  const ItemShop = React.lazy(() => import("./pages/ItemShop/ItemShop"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  const Feed = React.lazy(() => import("@/pages/Feed/Feed"));
  const MyRoom = React.lazy(() => import("./pages/MyRoom/MyRoom"));
  const MyGoals = React.lazy(() => import("./pages/MyGoals/MyGoals"));
  const OauthRedirect = React.lazy(
    () => import("./pages/OauthRedirect/OauthRedirect")
  );
  const TermsOfUse = React.lazy(() => import("./pages/TermsOfUse/TermsOfUse"));

  return (
    <div className="App">
      {/* fallback 추가해야 됨 */}
      <Suspense>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/item-shop" element={<ItemShop />} />
              <Route path="/main" element={<Main />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/myroom" element={<MyRoom />} />
              <Route path="/mygoals" element={<MyGoals />} />
              <Route path="/csquiz" element={<CSQuiz />} />
              <Route path="/mygoals" element={<MyGoals />} />
              <Route path="/oauth-login" element={<OauthRedirect />} />
              <Route path="/termsOfUse" element={<TermsOfUse />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </Suspense>
    </div>
  );
}

export default App;
