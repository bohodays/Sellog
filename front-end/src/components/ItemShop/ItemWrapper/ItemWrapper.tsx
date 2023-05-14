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
import { Coffee_cup_1 } from "./Models/Coffee_cup_1";
import { Elec_guitar_1 } from "./Models/Elec_guitar_1";
import { Elec_guitar_2 } from "./Models/Elec_guitar_2";
import { Elec_guitar_3 } from "./Models/Elec_guitar_3";
import { Katana_decoration_1 } from "./Models/Katana_decoration_1";
import { Giant_sofa_1 } from "./Models/Giant_sofa_1";
import { Green_sofa_1 } from "./Models/Green_sofa_1";
import { Grey_bin_1 } from "./Models/Grey_bin_1";
import { Group_guitar_1 } from "./Models/Group_guitar_1";
import { House_tree_1 } from "./Models/House_tree_1";
import { Imac_computer_1 } from "./Models/Imac_computer_1";
import { Leopard_chair_1 } from "./Models/Leopard_chair_1";
import { Low_table_1 } from "./Models/Low_table_1";
import { Marble_table_1 } from "./Models/Marble_table_1";
import { Marble_table_2 } from "./Models/Marble_table_2";
import { Old_computer_1 } from "./Models/Old_computer_1";
import { Old_computer_2 } from "./Models/Old_computer_2";
import { Old_microwave_1 } from "./Models/Old_microwave_1";
import { Old_tv_1 } from "./Models/Old_tv_1";
import { Orange_sofa_1 } from "./Models/Orange_sofa_1";
import { Photo_frame_1 } from "./Models/Photo_frame_1";
import { Photo_frame_2 } from "./Models/Photo_frame_2";
import { Red_chair_1 } from "./Models/Red_chair_1";
import { Red_lights_1 } from "./Models/Red_lights_1";
import { Red_sofa_1 } from "./Models/Red_sofa_1";
import { Red_telephone_1 } from "./Models/Red_telephone_1";
import { Retro_arcadegame_1 } from "./Models/Retro_arcadegame_1";
import { Round_table_1 } from "./Models/Round_table_1";
import { Small_speaker_1 } from "./Models/Small_speaker_1";
import { Stall_white_chair_1 } from "./Models/Stall_white_chair_1";
import { Starwars_trooper_1 } from "./Models/Starwars_trooper_1";
import { Teddybear_1 } from "./Models/Teddybear_1";
import { Tree_vase_1 } from "./Models/Tree_vase_1";
import { Trooper_figure_1 } from "./Models/Trooper_figure_1";
import { White_chair_1 } from "./Models/White_chair_1";
import { White_controller_1 } from "./Models/White_controller_1";
import { White_skeleton_1 } from "./Models/White_skeleton_1";
import { White_sofa_1 } from "./Models/White_sofa_1";
import { White_table_1 } from "./Models/White_table_1";
import { Wine_glass_1 } from "./Models/Wine_glass_1";
import { Wood_chair_1 } from "./Models/Wood_chair_1";
import { Wood_desk_0 } from "./Models/Wood_desk_0";
import { Wood_desk_1 } from "./Models/Wood_desk_1";
import { Wood_desk_2 } from "./Models/Wood_desk_2";
import { Wood_drawer_1 } from "./Models/Wood_drawer_1";
import { Wood_shelve } from "./Models/Wood_shelve";
import { Yellow_sofa_1 } from "./Models/Yellow_sofa_1";
import { Wood_table_1 } from "./Models/Wood_table_1";

const Scene = ({ shopItem }: IShopItemProps) => {
  const itemName = shopItem?.name;
  const id = shopItem?.id;

  return (
    <Suspense>
      <ambientLight color={"#ffffff"} intensity={0.5} />
      <directionalLight
        color={"#ffffff"}
        intensity={0.8}
        position={[1.5, 7, 3]}
        castShadow={true}
        shadow-camera-far={20}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.05}
      />
      <PerspectiveCamera
        makeDefault={true}
        // far={500}
        position={[0, 1, 8]}
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
      ) : id === 20 ? (
        <Giant_sofa_1 />
      ) : id == 21 ? (
        <Green_sofa_1 />
      ) : id == 22 ? (
        <Grey_bin_1 />
      ) : id == 23 ? (
        <Group_guitar_1 />
      ) : id == 24 ? (
        <House_tree_1 />
      ) : id == 25 ? (
        <Imac_computer_1 />
      ) : id === 26 ? (
        <Katana_decoration_1 />
      ) : id == 27 ? (
        <Leopard_chair_1 />
      ) : id == 28 ? (
        <Low_table_1 />
      ) : id == 29 ? (
        <Marble_table_1 />
      ) : id == 30 ? (
        <Marble_table_2 />
      ) : id == 31 ? (
        <Old_computer_1 />
      ) : id == 32 ? (
        <Old_computer_2 />
      ) : id == 33 ? (
        <Old_microwave_1 />
      ) : id == 34 ? (
        <Old_tv_1 />
      ) : id == 35 ? (
        <Orange_sofa_1 />
      ) : id == 36 ? (
        <Photo_frame_1 />
      ) : id == 37 ? (
        <Photo_frame_2 />
      ) : id == 38 ? (
        <Red_chair_1 />
      ) : id == 39 ? (
        <Red_lights_1 />
      ) : id == 40 ? (
        <Red_sofa_1 />
      ) : id == 41 ? (
        <Red_telephone_1 />
      ) : id == 42 ? (
        <Retro_arcadegame_1 />
      ) : id == 43 ? (
        <Round_table_1 />
      ) : id == 44 ? (
        <Small_speaker_1 />
      ) : id == 45 ? (
        <Stall_white_chair_1 />
      ) : id == 46 ? (
        <Starwars_trooper_1 />
      ) : id == 47 ? (
        <Teddybear_1 />
      ) : id == 48 ? (
        <Tree_vase_1 />
      ) : id == 49 ? (
        <Trooper_figure_1 />
      ) : id == 50 ? (
        <White_chair_1 />
      ) : id == 51 ? (
        <White_controller_1 />
      ) : id == 52 ? (
        <White_skeleton_1 />
      ) : id == 53 ? (
        <White_sofa_1 />
      ) : id == 54 ? (
        <White_table_1 />
      ) : id == 55 ? (
        <Wine_glass_1 />
      ) : id == 56 ? (
        <Wood_chair_1 />
      ) : id == 57 ? (
        <Wood_desk_0 />
      ) : id == 58 ? (
        <Wood_desk_1 />
      ) : id == 59 ? (
        <Wood_desk_2 />
      ) : id == 60 ? (
        <Wood_drawer_1 />
      ) : id == 61 ? (
        <Wood_shelve />
      ) : id == 62 ? (
        <Wood_table_1 />
      ) : id == 63 ? (
        <Yellow_sofa_1 />
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
