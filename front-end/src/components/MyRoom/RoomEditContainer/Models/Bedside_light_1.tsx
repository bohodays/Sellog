/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/bedside_light_1.glb -t
*/

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRecoilState } from "recoil";
import { itemTargetState, myItemsState } from "@/recoil/myroom/atoms";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder001_1: THREE.Mesh;
    Cylinder001_2: THREE.Mesh;
  };
  materials: {
    Beige: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
  };
};

export function Bedside_light_1(props: JSX.IntrinsicElements["group"] | any) {
  const { nodes, materials } = useGLTF(
    "/models/items/bedside_light_1.glb"
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

  const { scene, camera, gl } = useThree();
  const raycaster = new THREE.Raycaster();

  function intersect(pos: THREE.Vector2) {
    raycaster.setFromCamera(pos, camera);
    return raycaster.intersectObjects(scene.children);
  }

  const [myItems, setMyItems] = useRecoilState(myItemsState);

  const updateTagetItemPosition = (
    id: number,
    x: number,
    y: number,
    z: number,
    deg: number
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
          deg,
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
    props.downButtonRef.current
  ) {
    const leftRotation = () => {
      let newRotation = (rotation - 10) % 360;
      setRotation(newRotation);
    };

    const rightRotation = () => {
      let newRotation = (rotation + 10) % 360;
      setRotation(newRotation);
    };

    const positionUp = () => {
      if (position.y < 3) {
        const newY = position.y + 0.2;
        setPosition({ x: position.x, y: newY, z: position.z });
      }
    };

    const positionDown = () => {
      if (position.y > -2.5) {
        const newY = position.y - 0.2;
        setPosition({ x: position.x, y: newY, z: position.z });
      }
    };

    if (target === "Bedside_light_1") {
      props.rotationLeftButtonRef.current.addEventListener(
        "click",
        leftRotation
      );
      props.rotationRigthButtonRef.current.addEventListener(
        "click",
        rightRotation
      );
      props.upButtonRef.current.addEventListener("click", positionUp);
      props.downButtonRef.current.addEventListener("click", positionDown);
    } else {
      props.rotationLeftButtonRef.current.removeEventListener(
        "click",
        leftRotation
      );
      props.rotationRigthButtonRef.current.removeEventListener(
        "click",
        rightRotation
      );
    }
  }

  return (
    <group
      {...props}
      dispose={null}
      scale={0.8}
      position={[position.x, position.y, position.z]}
      userData={{ draggable: true, name: "Bedside_light_1" }}
      onClick={() => {
        if (props.activePage === "myitems") {
          if (!isDragging) setIsDragging(true);
          setTarget("Bedside_light_1");
        }
      }}
      rotation={[0, THREE.MathUtils.degToRad(rotation), 0]}
    >
      <group scale={0.58}>
        <mesh
          geometry={nodes.Cylinder001_1.geometry}
          material={materials.Beige}
        />
        <mesh
          geometry={nodes.Cylinder001_2.geometry}
          material={materials.White}
        />
      </group>
    </group>
  );
}

// // useGLTF.preload("/models/items/bedside_light_1.glb");
