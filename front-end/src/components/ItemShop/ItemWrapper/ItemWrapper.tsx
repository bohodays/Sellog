import React, { Suspense } from "react";
import { Chair } from "../ItemItem/Models/Chair";
import { Bed } from "../ItemItem/Models/Bed";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { IItemProps } from "@/typeModels/ItemShop/iteminterfaces";
import { WoodDesk } from "../ItemItem/Models/WoodDesk";
import { WoodShelve } from "../ItemItem/Models/WoodShelve";

const Scene = ({ item }: IItemProps) => {
  const itemName = item?.name;

  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      <PerspectiveCamera makeDefault={true} far={1000} position={[0, 3, 8]} />
      {itemName === "chair" ? (
        <Chair />
      ) : itemName === "bed" ? (
        <Bed />
      ) : itemName === "desk" ? (
        <WoodDesk />
      ) : itemName === "wood_shelve" ? (
        <WoodShelve />
      ) : null}
    </Suspense>
  );
};

const ItemWrapper = ({ item }: IItemProps) => {
  return (
    <>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls minZoom={80} maxZoom={200} enablePan={false} />
        <Scene item={item} />
      </Canvas>
    </>
  );
};

export default ItemWrapper;
