/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/black_speaker_1.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

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

export function Black_speaker_1(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/black_speaker_1.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group
        position={[-0.03, 0, -0.05]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.96}
      >
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