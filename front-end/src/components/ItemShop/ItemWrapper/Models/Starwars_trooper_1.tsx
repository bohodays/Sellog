/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/starwars_trooper_1.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Circle011: THREE.Mesh;
    Circle012: THREE.Mesh;
    Mesh_1: THREE.Mesh;
    Mesh_2: THREE.Mesh;
  };
  materials: {
    white: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/starwars_trooper_1.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle011.geometry}
        material={materials.white}
        position={[0, -0.05, -0.02]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.17}
      />
      <mesh
        geometry={nodes.Circle012.geometry}
        material={materials.white}
        position={[0, -0.05, -0.02]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.17}
      />
      <group
        position={[0, -0.05, -0.02]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.17}
      >
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.black} />
        <mesh geometry={nodes.Mesh_2.geometry} material={materials.white} />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/items/starwars_trooper_1.glb");
