/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/white_table_1.glb -t
*/

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  itemTargetState,
  itemsHeightState,
  myItemsState,
} from "@/recoil/myroom/atoms";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Table001: THREE.Mesh;
    Plane011: THREE.Mesh;
    Plane012: THREE.Mesh;
  };
  materials: {
    Wood: THREE.MeshStandardMaterial;
    Resin: THREE.MeshPhysicalMaterial;
    Metal: THREE.MeshStandardMaterial;
  };
};

export function White_table_1(props: JSX.IntrinsicElements["group"] | any) {
  const { nodes, materials } = useGLTF(
    "/models/items/white_table_1.glb"
  ) as GLTFResult;

  const [propsX, propsY, propsZ] = props.position;
  const propsDeg = props.deg;

  // 좌표 (서버에 저장된 좌표로 수정하기)
  const [position, setPosition] = useState({ x: propsX, y: propsY, z: propsZ });
  const [isDragging, setIsDragging] = useState(false);

  // 회전 정보 (서버에 저장된 좌표로 수정하기)
  const [rotation, setRotation] = useState(propsDeg);

  // 타겟 정보
  const [target, setTarget] = useRecoilState(itemTargetState);
  const [moveUp, setMoveUp] = useState(false);
  const [moveDown, setMoveDown] = useState(false);
  const [rotationLeft, setRotationLeft] = useState(false);
  const [rotationRight, setRotationRight] = useState(false);

  const positionUp = () => {
    if (target === "White_table_1") {
      if (position.y < 3) {
        const newY = Number(position.y) + 0.2;
        const copyArray = [...myItems];
        myItems.forEach((getItem, index) => {
          if (getItem.itemId === props.itemId) {
            const newObj: any = { ...getItem };
            newObj["y"] = newY;
            copyArray[index] = newObj;
          }
        });
        setItemsHeight([...copyArray]);
        setPosition({ x: position.x, y: newY, z: position.z });
      }
    }
  };

  const positionDown = () => {
    if (target === "White_table_1") {
      if (position.y > -2.5) {
        const newY = Number(position.y) - 0.2;
        const copyArray = [...myItems];
        myItems.forEach((getItem, index) => {
          if (getItem.itemId === props.itemId) {
            const newObj: any = { ...getItem };
            newObj["y"] = newY;

            copyArray[index] = newObj;
          }
        });
        setItemsHeight([...copyArray]);
        setPosition({ x: position.x, y: newY, z: position.z });
      }
    }
  };

  const leftRotation = () => {
    if (target === "White_table_1") {
      let newRotation = (rotation - 10) % 360;
      setRotation(newRotation);
      const copyArray = [...myItems];
      myItems.forEach((getItem, index) => {
        if (getItem.itemId === props.itemId) {
          const newObj: any = { ...getItem };
          newObj["rotation"] = newRotation;

          copyArray[index] = newObj;
        }
      });
      setItemsHeight([...copyArray]);
    }
  };

  const rightRotation = () => {
    if (target === "White_table_1") {
      let newRotation = (rotation + 10) % 360;
      setRotation(newRotation);
      const copyArray = [...myItems];
      myItems.forEach((getItem, index) => {
        if (getItem.itemId === props.itemId) {
          const newObj: any = { ...getItem };
          newObj["rotation"] = newRotation;

          copyArray[index] = newObj;
        }
      });
      setItemsHeight([...copyArray]);
    }
  };

  const itemDelete = () => {
    if (target === "White_table_1") {
      updateTagetItemPosition(props.itemId, null, null, null, null);
      setTarget(null);
    }
  };

  useEffect(() => {
    if (moveUp) {
      positionUp();
      setMoveUp(false);
    }

    if (moveDown) {
      positionDown();
      setMoveDown(false);
    }

    if (rotationLeft) {
      leftRotation();
      setRotationLeft(false);
    }

    if (rotationRight) {
      rightRotation();
      setRotationRight(false);
    }
  }, [moveUp, moveDown, rotationLeft, rotationRight]);

  const { scene, camera, gl } = useThree();
  const raycaster = new THREE.Raycaster();

  function intersect(pos: THREE.Vector2) {
    raycaster.setFromCamera(pos, camera);
    return raycaster.intersectObjects(scene.children);
  }

  const [myItems, setMyItems] = useRecoilState(myItemsState);

  const setItemsHeight = useSetRecoilState(itemsHeightState);

  const updateTagetItemPosition = (
    id: number,
    x: number | null,
    y: number | null,
    z: number | null,
    deg: number | null
  ) => {
    myItems.forEach((item, i) => {
      // itemId가 일치하는 아이템 선별
      if (item.itemId === id) {
        // 변화된 포지션 저장
        let newItemPosition = {
          ...item,
          x,
          y,
          z,
          rotation: deg,
        };
        // 불변성 유지를 위한 새로운 배열 생성
        const newItems = [...myItems];
        newItems[i] = newItemPosition;

        // 새로운 배열을 atom에 저장
        setMyItems(newItems);
      }
    });
  };

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (props.activePage === "myitems") {
      gl.domElement.addEventListener("click", handleWindowClick);

      // atom에 변화된 포지션 저장
      updateTagetItemPosition(
        props.itemId,
        position.x,
        position.y,
        position.z,
        rotation
      );
    }

    return () => {
      if (props.activePage === "myitems") {
        gl.domElement.removeEventListener("click", handleWindowClick);
      }
    };
  }, [isDragging]);

  useFrame(({ mouse }) => {
    if (props.activePage === "myitems") {
      if (isDragging) {
        const found = intersect(mouse);

        if (found.length > 0) {
          for (let i = 0; i < found.length; i++) {
            if (!found[i].object.userData.ground) continue;

            // 물체가 마우스와 만난 지점으로 위치를 업데이트하기
            const newPosition = found[i].point;
            setPosition({ x: newPosition.x, y: position.y, z: newPosition.z });
            break;
          }
        }
      }
    }
  });

  // 물체 회전
  if (
    props.rotationLeftButtonRef.current &&
    props.rotationRigthButtonRef.current &&
    props.upButtonRef.current &&
    props.downButtonRef.current &&
    props.deleteButtonRef.current
  ) {
    if (target === "White_table_1") {
      props.rotationLeftButtonRef.current.addEventListener("click", () => {
        setRotationLeft(true);
      });
      props.rotationRigthButtonRef.current.addEventListener("click", () => {
        setRotationRight(true);
      });
      props.upButtonRef.current.addEventListener("click", () => {
        setMoveUp(true);
      });
      props.downButtonRef.current.addEventListener("click", () => {
        setMoveDown(true);
      });
      props.deleteButtonRef.current.addEventListener("click", itemDelete);
    }
  }

  return (
    <group
      {...props}
      dispose={null}
      position={[position.x, position.y, position.z]}
      userData={{ draggable: true, name: "White_table_1" }}
      onClick={() => {
        if (props.activePage === "myitems") {
          if (!isDragging) setIsDragging(true);
          setTarget("White_table_1");
        }
      }}
      rotation={[0, THREE.MathUtils.degToRad(rotation), 0]}
    >
      <mesh geometry={nodes.Table001.geometry} material={materials.Wood}>
        <mesh geometry={nodes.Plane011.geometry} material={materials.Resin} />
        <mesh geometry={nodes.Plane012.geometry} material={materials.Metal} />
      </mesh>
    </group>
  );
}

// // useGLTF.preload("/models/items/white_table_1.glb");
