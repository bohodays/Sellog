import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { IShopItemProps } from "@/typeModels/ItemShop/iteminterfaces";
import { BedSide_light_1 } from "./Models/Bedside_light_1";
import { Black_chair_1 } from "./Models/Black_chair_1";
import { Black_coffeemachine_1 } from "./Models/Black_coffeemachine_1";
import { Black_cup_1 } from "./Models/Black_cup_1";
import { Black_leather_sofa_1 } from "./Models/Black_leather_sofa_1";
import { Black_speaker_1 } from "./Models/Black_speaker_1";
import { Black_teatable_1 } from "./Models/Black_teatable_1";
import { Blue_chair_1 } from "./Models/Blue_chair_1";
import { Blue_chair_2 } from "./Models/Blue_chair_2";
import { Blue_sofa_1 } from "./Models/Blue_sofa_1";
import { Brown_table_1 } from "./Models/Brown_table_1";
import { Blue_bed } from "./Models/Blue_bed";
import { Brown_table_2 } from "./Models/Brown_table_2";
import { Brown_table_3 } from "./Models/Brown_table_3";
import { Brown_table_4 } from "./Models/Brown_table_4";
import { Coffee_cup_1 } from "@/components/MyRoom/RoomEditContainer/Models/Coffee_cup_1";
import { Elec_guitar_1 } from "./Models/Elec_guitar_1";
import { Elec_guitar_2 } from "./Models/Elec_guitar_2";
import { Elec_guitar_3 } from "./Models/Elec_guitar_3";

const Scene = ({ shopItem }: IShopItemProps) => {
  const itemName = shopItem?.name;
  const id = shopItem?.id;

  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      <PerspectiveCamera
        makeDefault={true}
        // far={500}
        position={[0, 0, 8]}
      />
      {id === 1 ? (
        <BedSide_light_1 />
      ) : id === 2 ? (
        <Black_chair_1 />
      ) : id === 3 ? (
        <Black_coffeemachine_1 />
      ) : id === 4 ? (
        <Black_cup_1 />
      ) : id === 5 ? (
        <Black_leather_sofa_1 />
      ) : id === 6 ? (
        <Black_speaker_1 />
      ) : id === 7 ? (
        <Black_teatable_1 />
      ) : id === 8 ? (
        <Blue_bed />
      ) : id === 9 ? (
        <Blue_chair_1 />
      ) : id === 10 ? (
        <Blue_chair_2 />
      ) : id === 11 ? (
        <Blue_sofa_1 />
      ) : id === 12 ? (
        <Brown_table_1 />
      ) : id === 13 ? (
        <Brown_table_2 />
      ) : id === 14 ? (
        <Brown_table_3 />
      ) : id === 15 ? (
        <Brown_table_4 />
      ) : id === 16 ? (
        <Coffee_cup_1 />
      ) : id === 17 ? (
        <Elec_guitar_1 />
      ) : id === 18 ? (
        <Elec_guitar_2 />
      ) : id === 19 ? (
        <Elec_guitar_3 />
      ) : null}
    </Suspense>
  );
};

const ItemWrapper = ({ shopItem }: IShopItemProps) => {
  return (
    <>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls minZoom={80} maxZoom={200} enablePan={false} />
        <Scene shopItem={shopItem} />
      </Canvas>
    </>
  );
};

export default ItemWrapper;
