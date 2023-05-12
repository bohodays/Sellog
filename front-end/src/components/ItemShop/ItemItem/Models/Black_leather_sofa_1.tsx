/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/black_leather_sofa_1.glb -t
*/

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  itemTargetState,
  itemsHeightState,
  myItemsState,
} from "@/recoil/myroom/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Sofa: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube008: THREE.Mesh;
    Plane018: THREE.Mesh;
    Plane021: THREE.Mesh;
  };
  materials: {
    ["Leather.001"]: THREE.MeshStandardMaterial;
  };
};

export function Black_leather_sofa_1(
  props: JSX.IntrinsicElements["group"] | any
) {
  const { nodes, materials } = useGLTF(
    "/models/items/black_leather_sofa_1.glb"
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
    const leftRotation = () => {
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
    };

    const rightRotation = () => {
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
    };

    const positionUp = () => {
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
    };

    const positionDown = () => {
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
    };

    const itemDelete = () => {
      updateTagetItemPosition(props.itemId, null, null, null, null);
      setTarget(null);
    };

    if (target === "Black_leather_sofa_1") {
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
      props.deleteButtonRef.current.addEventListener("click", itemDelete);
    } else {
      props.rotationLeftButtonRef.current.removeEventListener(
        "click",
        leftRotation
      );
      props.rotationRigthButtonRef.current.removeEventListener(
        "click",
        rightRotation
      );
      props.deleteButtonRef.current.removeEventListener("click", itemDelete);
    }
  }

  return (
    <group
      {...props}
      dispose={null}
      scale={0.7}
      position={[position.x, position.y, position.z]}
      userData={{ draggable: true, name: "Black_leather_sofa_1" }}
      onClick={() => {
        if (props.activePage === "myitems") {
          if (!isDragging) setIsDragging(true);
          setTarget("Black_leather_sofa_1");
        }
      }}
      rotation={[0, THREE.MathUtils.degToRad(rotation), 0]}
    >
      <mesh
        geometry={nodes.Sofa.geometry}
        material={materials["Leather.001"]}
        scale={[1.05, 1.25, 0.96]}
      >
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials["Leather.001"]}
          position={[0.98, 0.82, -0.11]}
        />
        <mesh
          geometry={nodes.Cube008.geometry}
          material={materials["Leather.001"]}
          position={[-1.04, 0.82, -0.11]}
        />
        <mesh
          geometry={nodes.Plane018.geometry}
          material={materials["Leather.001"]}
          position={[-0.86, 0.08, -0.92]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.1}
        />
        <mesh
          geometry={nodes.Plane021.geometry}
          material={materials["Leather.001"]}
          position={[-2.07, 0.08, 0.87]}
          scale={0.77}
        />
      </mesh>
    </group>
  );
}

// useGLTF.preload("/models/items/black_leather_sofa_1.glb");
