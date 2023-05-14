/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/brown_table_3.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Table: THREE.Mesh;
    Plane002: THREE.Mesh;
  };
  materials: {
    wood: THREE.MeshStandardMaterial;
  };
};

export function Brown_table_3(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/brown_table_3.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Table.geometry}
        material={materials.wood}
        scale={1.2}
        position={[0, -0.5, 0]}
        rotation={[0, THREE.MathUtils.degToRad(-90), 0]}
      >
        <mesh geometry={nodes.Plane002.geometry} material={materials.wood} />
      </mesh>
    </group>
  );
}

// useGLTF.preload("/models/items/brown_table_3.glb");
