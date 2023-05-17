import React from "react";
import { Html, useProgress } from "@react-three/drei";
import Lottie from "react-lottie";
import animationData from "@/assets/imgs/turtle-loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
    scaleMode: "scale-up",
  },
};

const Loading = () => {
  return (
    <Html center>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20vw",
          textAlign: "center",
          // height: "500px",
        }}
      >
        <Lottie options={defaultOptions} />
        <p style={{ color: "white", fontFamily: "Chicle", fontSize: "3vw" }}>
          Loading
        </p>
      </div>
    </Html>
  );
};

export default Loading;
