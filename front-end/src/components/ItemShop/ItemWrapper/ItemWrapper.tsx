import React, { Suspense } from "react";
import { Chair } from "../ItemItem/Models/Chair";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      <Chair />
    </Suspense>
  );
};

const ItemWrapper = () => {
  return (
    <>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls minZoom={80} maxZoom={200} enablePan={false} />
        <Scene />
      </Canvas>
    </>
  );
};

export default ItemWrapper;
