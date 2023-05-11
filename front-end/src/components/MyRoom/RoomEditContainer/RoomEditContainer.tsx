import React, { useState } from "react";
import { Bedside_light_1 } from "@/components/ItemShop/ItemItem/Models/Bedside_light_1";
import { Black_chair_1 } from "@/components/ItemShop/ItemItem/Models/Black_chair_1";
import { Black_coffeemachine_1 } from "@/components/ItemShop/ItemItem/Models/Black_coffeemachine_1";
import { Black_cup_1 } from "@/components/ItemShop/ItemItem/Models/Black_cup_1";
import { Black_leather_sofa_1 } from "@/components/ItemShop/ItemItem/Models/Black_leather_sofa_1";
import { Black_speaker_1 } from "@/components/ItemShop/ItemItem/Models/Black_speaker_1";
import { Black_teatable_1 } from "@/components/ItemShop/ItemItem/Models/Black_teatable_1";
import { Blue_bed } from "@/components/ItemShop/ItemItem/Models/Blue_bed";
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
import { useRecoilState } from "recoil";
import { myItemsState } from "@/recoil/myroom/atoms";

const RoomEditContainer = ({
  activePage,
  upButtonRef,
  downButtonRef,
  editButtonRef,
  rotationLeftButtonRef,
  rotationRigthButtonRef,
  deleteButtonRef,
  goBackButtonRef,
}: any) => {
  const [myItems, setMyItems] = useRecoilState(myItemsState);

  return (
    <>
      {myItems.length &&
        myItems.map((item) => {
          if (item.x !== null) {
            if (item.itemId === 1) {
              return (
                <Bedside_light_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 2) {
              return (
                <Black_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 3) {
              return (
                <Black_coffeemachine_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 4) {
              return (
                <Black_cup_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 5) {
              return (
                <Black_leather_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 6) {
              return (
                <Black_speaker_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 7) {
              return (
                <Black_teatable_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 8) {
              return (
                <Blue_bed
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 9) {
              return (
                <Blue_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 10) {
              return (
                <Blue_chair_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 11) {
              return (
                <Blue_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 12) {
              return (
                <Brown_table_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 13) {
              return (
                <Brown_table_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 14) {
              return (
                <Brown_table_3
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 15) {
              return (
                <Brown_table_4
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 16) {
              return (
                <Coffee_cup_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 17) {
              return (
                <Elec_guitar_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 18) {
              return (
                <Elec_guitar_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 19) {
              return (
                <Elec_guitar_3
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 20) {
              return (
                <Giant_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 21) {
              return (
                <Green_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 22) {
              return (
                <Grey_bin_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 23) {
              return (
                <Group_guitar_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 24) {
              return (
                <House_tree_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 25) {
              return (
                <Imac_computer_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 26) {
              return (
                <Katana_decoration_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 27) {
              return (
                <Leopard_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 28) {
              return (
                <Low_table_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 29) {
              return (
                <Marble_table_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 30) {
              return (
                <Marble_table_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 31) {
              return (
                <Old_computer_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 32) {
              return (
                <Old_computer_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 33) {
              return (
                <Old_microwave_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 34) {
              return (
                <Old_tv_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 35) {
              return (
                <Orange_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 36) {
              return (
                <Photo_frame_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 37) {
              return (
                <Photo_frame_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 38) {
              return (
                <Red_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 39) {
              return (
                <Red_lights_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 40) {
              return (
                <Red_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 41) {
              return (
                <Red_telephone_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 42) {
              return (
                <Retro_arcadegame_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 43) {
              return (
                <Round_table_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 44) {
              return (
                <Small_speaker_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 45) {
              return (
                <Stall_white_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 46) {
              return (
                <Starwars_trooper_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 47) {
              return (
                <Teddybear_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 48) {
              return (
                <Tree_vase_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 49) {
              return (
                <Trooper_figure_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 50) {
              return (
                <White_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 51) {
              return (
                <White_controller_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 52) {
              return (
                <White_skeleton_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 53) {
              return (
                <White_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 54) {
              return (
                <White_table_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 55) {
              return (
                <Wine_glass_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 56) {
              return (
                <Wood_chair_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 57) {
              return (
                <Wood_desk_0
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 58) {
              return (
                <Wood_desk_1
                  itemId={item.itemId}
                  activePage={activePage}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                />
              );
            } else if (item.itemId === 59) {
              return (
                <Wood_desk_2
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 60) {
              return (
                <Wood_drawer_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 61) {
              return (
                <Wood_shelve
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 62) {
              return (
                <Wood_table_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            } else if (item.itemId === 63) {
              return (
                <Yellow_sofa_1
                  itemId={item.itemId}
                  position={[item.x, item.y, item.z]}
                  deg={item.rotation}
                  activePage={activePage}
                  upButtonRef={upButtonRef}
                  downButtonRef={downButtonRef}
                  editButtonRef={editButtonRef}
                  rotationLeftButtonRef={rotationLeftButtonRef}
                  rotationRigthButtonRef={rotationRigthButtonRef}
                  deleteButtonRef={deleteButtonRef}
                  goBackButtonRef={goBackButtonRef}
                />
              );
            }
          }
        })}
    </>
  );
};

export default RoomEditContainer;
