/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/white_controller_1.glb -t
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
    Plane022: THREE.Mesh;
    Circle035: THREE.Mesh;
    Circle036: THREE.Mesh;
    Circle037: THREE.Mesh;
    Circle038: THREE.Mesh;
    Circle040: THREE.Mesh;
    Circle041: THREE.Mesh;
    Circle042: THREE.Mesh;
    Circle043: THREE.Mesh;
    Circle039: THREE.Mesh;
    Plane023: THREE.Mesh;
    Plane024: THREE.Mesh;
  };
  materials: {
    Black: THREE.MeshStandardMaterial;
    ["Black.002"]: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
    Grey: THREE.MeshStandardMaterial;
  };
};

export function White_controller_1(
  props: JSX.IntrinsicElements["group"] | any
) {
  const { nodes, materials } = useGLTF(
    "/models/items/white_controller_1.glb"
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

    if (target === "White_controller_1") {
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
      position={[position.x, position.y, position.z]}
      userData={{ draggable: true, name: "White_controller_1" }}
      onClick={() => {
        if (props.activePage === "myitems") {
          if (!isDragging) setIsDragging(true);
          setTarget("White_controller_1");
        }
      }}
      rotation={[0, THREE.MathUtils.degToRad(rotation), 0]}
    >
      <mesh
        geometry={nodes.Plane022.geometry}
        material={nodes.Plane022.material}
        scale={1.48}
      >
        <mesh
          geometry={nodes.Circle035.geometry}
          material={materials.Black}
          position={[-0.01, 0.13, 0.11]}
          rotation={[-1.53, 1.51, 1.61]}
          scale={1.17}
        />
        <mesh
          geometry={nodes.Circle036.geometry}
          material={materials.Black}
          position={[0.08, 0.12, -0.07]}
          rotation={[1.6, 1.31, -1.62]}
          scale={1.17}
        />
        <mesh
          geometry={nodes.Circle037.geometry}
          material={materials.Black}
          position={[0.08, 0.12, 0.07]}
          rotation={[1.58, 1.31, -1.56]}
        />
        <mesh
          geometry={nodes.Circle038.geometry}
          material={materials["Black.002"]}
          position={[-0.06, 0.12, 0]}
          rotation={[0, 0, 0.28]}
          scale={0.75}
        />
        <mesh
          geometry={nodes.Circle040.geometry}
          material={materials["Black.002"]}
          position={[-0.01, 0.13, -0.08]}
          rotation={[0, 0, 0.06]}
          scale={0.45}
        />
        <mesh
          geometry={nodes.Circle041.geometry}
          material={materials["Black.002"]}
          position={[-0.01, 0.13, -0.15]}
          rotation={[-0.14, 0, 0.04]}
          scale={0.45}
        />
        <mesh
          geometry={nodes.Circle042.geometry}
          material={materials["Black.002"]}
          position={[0.02, 0.13, -0.11]}
          rotation={[-0.01, 0, -0.09]}
          scale={0.45}
        />
        <mesh
          geometry={nodes.Circle043.geometry}
          material={materials["Black.002"]}
          position={[-0.03, 0.13, -0.11]}
          rotation={[-0.01, 0, 0.17]}
          scale={0.45}
        />
        <mesh
          geometry={nodes.Circle039.geometry}
          material={materials.White}
          position={[0, 0.14, 0.03]}
          scale={0.35}
        />
        <mesh
          geometry={nodes.Plane023.geometry}
          material={materials.White}
          position={[0.03, 0.13, 0]}
          rotation={[1.57, 1.5, -1.57]}
          scale={0.91}
        />
        <mesh geometry={nodes.Plane024.geometry} material={materials.Grey} />
      </mesh>
    </group>
  );
}

// useGLTF.preload("/models/items/white_controller_1.glb");
