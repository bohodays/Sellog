import React, { useState } from "react";
import { Bedside_light_1 } from "@/components/ItemShop/ItemItem/Models/Bedside_light_1";
import { Big_car_1 } from "@/components/ItemShop/ItemItem/Models/Big_car_1";
import { Black_chair_1 } from "@/components/ItemShop/ItemItem/Models/Black_chair_1";
import { Black_coffeemachine_1 } from "@/components/ItemShop/ItemItem/Models/Black_coffeemachine_1";
import { Black_cup_1 } from "@/components/ItemShop/ItemItem/Models/Black_cup_1";
import { Black_leather_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Black_leather_sofa_1";
import { Black_speaker_1 } from "@/components/ItemShop/ItemItem/Models/Black_speaker_1";
import { Black_teatable_1 } from "@/components/ItemShop/ItemItem/Models/Black_teatable_1";
import { Blue_bed } from "@/components/ItemShop/ItemItem/Models/Blue_bed";
import { Blue_car_1 } from "@/components/ItemShop/ItemItem/Models/Blue_car_1";
import { Blue_chair_1 } from "@/components/ItemShop/ItemItem/Models/Blue_chair_1";
import { Blue_chair_2 } from "@/components/ItemShop/ItemItem/Models/Blue_chair_2";
import { Blue_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Blue_sofa_1";
import { Brown_table_1 } from "@/components/ItemShop/ItemItem/Models/Brown_table_1";
import { Brown_table_2 } from "@/components/ItemShop/ItemItem/Models/Brown_table_2";
import { Brown_table_3 } from "@/components/ItemShop/ItemItem/Models/Brown_table_3";
import { Brown_table_4 } from "@/components/ItemShop/ItemItem/Models/Brown_table_4";
import { Coffee_cup_1 } from "@/components/ItemShop/ItemItem/Models/Coffee_cup_1";
import { Elec_guitar_1 } from "@/components/ItemShop/ItemItem/Models/Elec_guitar_1";
import { Elec_guitar_2 } from "@/components/ItemShop/ItemItem/Models/Elec_guitar_2";
import { Elec_guitar_3 } from "@/components/ItemShop/ItemItem/Models/Elec_guitar_3";
import { Giant_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Giant_sofa_1";
import { Green_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Green_sofa_1";
import { Grey_bin_1 } from "@/components/ItemShop/ItemItem/Models/Grey_bin_1";
import { Group_guitar_1 } from "@/components/ItemShop/ItemItem/Models/Group_guitar_1";
import { House_tree_1 } from "@/components/ItemShop/ItemItem/Models/House_tree_1";
import { Imac_computer_1 } from "@/components/ItemShop/ItemItem/Models/Imac_computer_1";
import { Katana_decoration_1 } from "@/components/ItemShop/ItemItem/Models/Katana_decoration_1";
import { Leopard_chair_1 } from "@/components/ItemShop/ItemItem/Models/Leopard_chair_1";
import { Low_table_1 } from "@/components/ItemShop/ItemItem/Models/Low_table_1";
import { Marble_table_1 } from "@/components/ItemShop/ItemItem/Models/Marble_table_1";
import { Marble_table_2 } from "@/components/ItemShop/ItemItem/Models/Marble_table_2";
import { Old_computer_1 } from "@/components/ItemShop/ItemItem/Models/Old_computer_1";
import { Old_computer_2 } from "@/components/ItemShop/ItemItem/Models/Old_computer_2";
import { Old_microwave_1 } from "@/components/ItemShop/ItemItem/Models/Old_microwave_1";
import { Old_tv_1 } from "@/components/ItemShop/ItemItem/Models/Old_tv_1";
import { Orange_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Orange_sofa_1";
import { Photo_frame_1 } from "@/components/ItemShop/ItemItem/Models/Photo_frame_1";
import { Photo_frame_2 } from "@/components/ItemShop/ItemItem/Models/Photo_frame_2";
import { Red_car_1 } from "@/components/ItemShop/ItemItem/Models/Red_car_1";
import { Red_chair_1 } from "@/components/ItemShop/ItemItem/Models/Red_chair_1";
import { Red_lights_1 } from "@/components/ItemShop/ItemItem/Models/Red_lights_1";
import { Red_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Red_sofa_1";
import { Red_telephone_1 } from "@/components/ItemShop/ItemItem/Models/Red_telephone_1";
import { Retro_arcadegame_1 } from "@/components/ItemShop/ItemItem/Models/Retro_arcadegame_1";
import { Round_table_1 } from "@/components/ItemShop/ItemItem/Models/Round_table_1";
import { Small_speaker_1 } from "@/components/ItemShop/ItemItem/Models/Small_speaker_1";
import { Stall_white_chair_1 } from "@/components/ItemShop/ItemItem/Models/Stall_white_chair_1";
import { Starwars_trooper_1 } from "@/components/ItemShop/ItemItem/Models/Starwars_trooper_1";
import { Teddybear_1 } from "@/components/ItemShop/ItemItem/Models/Teddybear_1";
import { Tree_vase_1 } from "@/components/ItemShop/ItemItem/Models/Tree_vase_1";
import { Trooper_figure_1 } from "@/components/ItemShop/ItemItem/Models/Trooper_figure_1";
import { White_chair_1 } from "@/components/ItemShop/ItemItem/Models/White_chair_1";
import { White_controller_1 } from "@/components/ItemShop/ItemItem/Models/White_controller_1";
import { White_skeleton_1 } from "@/components/ItemShop/ItemItem/Models/White_skeleton_1";
import { White_sofa_1 } from "@/components/ItemShop/ItemItem/Models/White_sofa_1";
import { White_table_1 } from "@/components/ItemShop/ItemItem/Models/White_table_1";
import { Wine_glass_1 } from "@/components/ItemShop/ItemItem/Models/Wine_glass_1";
import { Wood_chair_1 } from "@/components/ItemShop/ItemItem/Models/Wood_chair_1";
import { Wood_desk_0 } from "@/components/ItemShop/ItemItem/Models/Wood_desk_0";
import { Wood_desk_1 } from "@/components/ItemShop/ItemItem/Models/Wood_desk_1";
import { Wood_desk_2 } from "@/components/ItemShop/ItemItem/Models/Wood_desk_2";
import { Wood_drawer_1 } from "@/components/ItemShop/ItemItem/Models/Wood_drawer_1";
import { Wood_shelve } from "@/components/ItemShop/ItemItem/Models/Wood_shelve";
import { Wood_table_1 } from "@/components/ItemShop/ItemItem/Models/Wood_table_1";
import { Yellow_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Yellow_sofa_1";

// type PropsType = {
//   isDragging: boolean;
//   setIsDragging: any;
// };

const RoomEditContainer = ({
  // target,
  // setTarget,
  activePage,
  editButtonRef,
  rotationLeftButtonRef,
  rotationRigthButtonRef,
}: any) => {
  // 여기서 유저가 가지고 있는 아이템 API 호출해서 가지고 있는 아이템들 리턴할 예정

  return (
    <>
      {/* <Bedside_light_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Big_car_1 /> */}
      {/* <Black_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      />
      <Black_coffeemachine_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Black_cup_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Black_leather_sofa_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Black_speaker_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Black_teatable_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Blue_bed
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Blue_car_1 /> */}
      {/* <Blue_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Blue_chair_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Blue_sofa_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Brown_table_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Brown_table_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Brown_table_3
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
        /> */}
      {/* <Brown_table_4
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Coffee_cup_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Elec_guitar_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Elec_guitar_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Elec_guitar_3
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
        /> */}
      {/* <Giant_sofa_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Green_sofa_1 /> */}
      {/* <Grey_bin_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Group_guitar_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <House_tree_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Imac_computer_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Katana_decoration_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Leopard_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
        /> */}
      {/* <Low_table_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Marble_table_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Marble_table_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Old_computer_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Old_computer_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Old_microwave_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Old_tv_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Orange_sofa_1 /> */}
      {/* <Photo_frame_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Photo_frame_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Red_car_1 /> */}
      {/* <Red_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
        /> */}
      {/* <Red_lights_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Red_sofa_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Red_telephone_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
        /> */}
      {/* <Retro_arcadegame_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Round_table_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Small_speaker_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Stall_white_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Starwars_trooper_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Teddybear_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Tree_vase_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Trooper_figure_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <White_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <White_controller_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <White_skeleton_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <White_sofa_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <White_table_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wine_glass_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_chair_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_desk_0
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_desk_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_desk_2
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_drawer_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_shelve
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      {/* <Wood_table_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      /> */}
      <Yellow_sofa_1
        activePage={activePage}
        editButtonRef={editButtonRef}
        rotationLeftButtonRef={rotationLeftButtonRef}
        rotationRigthButtonRef={rotationRigthButtonRef}
      />
    </>
  );
};

export default RoomEditContainer;
