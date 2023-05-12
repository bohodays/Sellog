/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/round_table_1.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh: THREE.Mesh;
    Mesh_1: THREE.Mesh;
  };
  materials: {
    Planks: THREE.MeshStandardMaterial;
    Wood: THREE.MeshStandardMaterial;
  };
};

export function Round_table_1(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/round_table_1.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[-0.03, 0, -0.07]} scale={0.88}>
        <mesh geometry={nodes.Mesh.geometry} material={materials.Planks} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.Wood} />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/items/round_table_1.glb");
