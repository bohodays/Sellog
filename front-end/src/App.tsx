import React, { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // Code Splitting
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const CSQuiz = React.lazy(() => import("./pages/CSQuiz/CSQuiz"));
  const ItemShop = React.lazy(() => import("./pages/ItemShop/ItemShop"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

  return (
    <div className="App">
      {/* fallback 추가해야 됨 */}
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/csquiz" element={<CSQuiz />} />
            <Route path="/item-shop" element={<ItemShop />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
