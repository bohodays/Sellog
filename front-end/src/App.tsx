import React, { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

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
              <Route path="/item-shop" element={<ItemShop />} />
              <Route path="/mygoals" element={<MyGoals />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </Suspense>
    </div>
  );
}

export default App;
