import React, { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // Code Splitting
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Main = React.lazy(() => import("./pages/Main/Main"));
  const CSQuiz = React.lazy(() => import("./pages/CSQuiz/CSQuiz"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  const MyRoom = React.lazy(() => import("./pages/MyRoom/MyRoom"));

  return (
    <div className="App">
      {/* fallback 추가해야 됨 */}
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/csquiz" element={<CSQuiz />} />
            <Route path="/myroom" element={<MyRoom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
