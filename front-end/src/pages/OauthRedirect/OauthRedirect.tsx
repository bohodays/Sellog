import { loginState } from "@/recoil/user/atom";
import { localData } from "@/utils/token";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const OauthRedirect = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    const search = params.search;
    const splitedSearch = search.split("&");

    const userId = +splitedSearch[2].slice(7);

    // 기존 유저면 0
    // 신규 유저면 1
    const isNewUser = +splitedSearch[3].slice(8);

    localStorage.setItem("refreshToken", splitedSearch[0].slice(14));
    localStorage.setItem("accessToken", splitedSearch[1].slice(12));
    setIsLoggedIn(true);

    // 신규 유저이면
    if (isNewUser === 1) {
      navigate("/login", {
        state: {
          userInfoUpdate: true,
          userId,
        },
      });
      // 기존 유저이면
    } else {
      navigate("/main");
      window.location.reload();
    }
  }, []);

  return <></>;
};

export default OauthRedirect;
