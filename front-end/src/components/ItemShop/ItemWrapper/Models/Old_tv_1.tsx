/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/old_tv_1.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    TV: THREE.Mesh;
    Plane040: THREE.Mesh;
    Plane040_1: THREE.Mesh;
    Plane019: THREE.Mesh;
    Plane020: THREE.Mesh;
    Plane021: THREE.Mesh;
  };
  materials: {
    black: THREE.MeshStandardMaterial;
    ["black-gloss"]: THREE.MeshStandardMaterial;
    ["screen-dos-game"]: THREE.MeshStandardMaterial;
    grey: THREE.MeshStandardMaterial;
    led: THREE.MeshStandardMaterial;
  };
};

export function Old_tv_1(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/old_tv_1.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.TV.geometry}
        material={materials.black}
        position={[-0.09, 1.82, -0.07]}
        rotation={[0, -0.24, 0]}
        scale={1.22}
      >
        <mesh geometry={nodes.Plane019.geometry} material={materials.black} />
        <mesh geometry={nodes.Plane020.geometry} material={materials.grey} />
        <mesh
          geometry={nodes.Plane021.geometry}
          material={materials.led}
          position={[0.52, 0.09, 0.31]}
        />
        <mesh
          geometry={nodes.Plane040.geometry}
          material={materials["black-gloss"]}
        />
        <mesh
          geometry={nodes.Plane040_1.geometry}
          material={materials["screen-dos-game"]}
        />
      </mesh>
    </group>
  );
}

// useGLTF.preload("/models/items/old_tv_1.glb");