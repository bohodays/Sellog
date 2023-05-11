/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/black_speaker_1.glb -t
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
    Plane001: THREE.Mesh;
    Plane001_1: THREE.Mesh;
    Head: THREE.Mesh;
    path2356004: THREE.Mesh;
    Plane015: THREE.Mesh;
    Plane015_1: THREE.Mesh;
    Plane016: THREE.Mesh;
    Plane016_1: THREE.Mesh;
    Plane016_2: THREE.Mesh;
    Plane033: THREE.Mesh;
    path2356005: THREE.Mesh;
    Plane034: THREE.Mesh;
  };
  materials: {
    Black: THREE.MeshStandardMaterial;
    ["Black.001"]: THREE.MeshStandardMaterial;
    ["default"]: THREE.MeshStandardMaterial;
    Brass: THREE.MeshStandardMaterial;
    Red: THREE.MeshPhysicalMaterial;
    Chrome: THREE.MeshStandardMaterial;
  };
};

export function Black_speaker_1(props: JSX.IntrinsicElements["group"] | any) {
  const { nodes, materials } = useGLTF(
    "/models/items/black_speaker_1.glb"
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
    x: number | null,
    y: number | null,
    z: number | null,
    deg: number | null
  ) => {
    console.log(x, y, z, "atom 갱신");

    myItems.forEach((item, i) => {
      // itemId가 일치하는 아이템 선별
      if (item.itemId === id) {
        console.log(item, "타겟 아톰 아이템");

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
  }, [isDragging, position.x, position.y, position.z, rotation]);

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
    };

    const rightRotation = () => {
      let newRotation = (rotation + 10) % 360;
      setRotation(newRotation);
    };

    const positionUp = () => {
      if (position.y < 3) {
        const newY = Number(position.y) + 0.2;
        // atom에 변화된 포지션 저장
        updateTagetItemPosition(
          props.itemId,
          position.x,
          newY,
          position.z,
          rotation
        );
        console.log(newY, position);

        setPosition({ x: position.x, y: newY, z: position.z });
      }
    };

    const positionDown = () => {
      if (position.y > -2.5) {
        const newY = Number(position.y) - 0.2;
        // atom에 변화된 포지션 저장
        updateTagetItemPosition(
          props.itemId,
          position.x,
          newY,
          position.z,
          rotation
        );
        setPosition({ x: position.x, y: newY, z: position.z });
      }
    };

    const itemDelete = () => {
      updateTagetItemPosition(props.itemId, null, null, null, null);
    };

    if (target === "Black_speaker_1") {
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
      scale={0.8}
      position={[position.x, position.y, position.z]}
      userData={{ draggable: true, name: "Black_speaker_1" }}
      onClick={() => {
        if (props.activePage === "myitems") {
          if (!isDragging) setIsDragging(true);
          setTarget("Black_speaker_1");
        }
      }}
      rotation={[0, THREE.MathUtils.degToRad(rotation), 0]}
    >
      <group position={[-0.03, 0, -0.05]} scale={0.96}>
        <mesh geometry={nodes.Plane001.geometry} material={materials.Black} />
        <mesh
          geometry={nodes.Plane001_1.geometry}
          material={materials["Black.001"]}
        />
        <mesh
          geometry={nodes.Head.geometry}
          material={materials.Black}
          position={[0, 1.83, -0.08]}
          scale={0.86}
        >
          <mesh
            geometry={nodes.path2356004.geometry}
            material={materials["default"]}
            position={[-0.31, 0.57, 0.24]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={5.61}
          />
          <group position={[0, 0, -0.03]}>
            <mesh
              geometry={nodes.Plane015.geometry}
              material={materials["Black.001"]}
            />
            <mesh
              geometry={nodes.Plane015_1.geometry}
              material={materials.Brass}
            />
          </group>
          <group position={[-0.63, 0.22, 0.27]}>
            <mesh
              geometry={nodes.Plane016.geometry}
              material={materials.Black}
            />
            <mesh
              geometry={nodes.Plane016_1.geometry}
              material={materials.Brass}
            />
            <mesh
              geometry={nodes.Plane016_2.geometry}
              material={materials.Red}
            />
          </group>
          <mesh
            geometry={nodes.Plane033.geometry}
            material={materials.Chrome}
          />
        </mesh>
        <mesh
          geometry={nodes.path2356005.geometry}
          material={materials["default"]}
          position={[-0.31, 1.22, 0.32]}
          rotation={[1.37, 0, 0]}
          scale={5.61}
        />
        <mesh geometry={nodes.Plane034.geometry} material={materials.Chrome} />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/items/black_speaker_1.glb");
