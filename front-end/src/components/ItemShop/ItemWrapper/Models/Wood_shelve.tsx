/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/wood_shelve.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Case: THREE.Mesh;
  };
  materials: {
    Wood2: THREE.MeshStandardMaterial;
  };
};

export function Wood_shelve(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/wood_shelve.glb"
  ) as GLTFResult;
  return (
    <group
      {...props}
      dispose={null}
      scale={1.3}
      position={[0, -1.7, 0]}
      rotation={[0, THREE.MathUtils.degToRad(180), 0]}
    >
      <mesh geometry={nodes.Case.geometry} material={materials.Wood2} />
    </group>
  );
}

// useGLTF.preload("/models/items/wood_shelve.glb");
