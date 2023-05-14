/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/photo_frame_2.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane015: THREE.Mesh;
    Plane015_1: THREE.Mesh;
  };
  materials: {
    Poster: THREE.MeshStandardMaterial;
    P1: THREE.MeshStandardMaterial;
  };
};

export function Photo_frame_2(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/photo_frame_2.glb"
  ) as GLTFResult;
  return (
    <group
      {...props}
      dispose={null}
      scale={2}
      // position={[0, -1, 0]}
      rotation={[0, -1.6, 0.1]}
    >
      <group>
        <mesh geometry={nodes.Plane015.geometry} material={materials.Poster} />
        <mesh geometry={nodes.Plane015_1.geometry} material={materials.P1} />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/items/photo_frame_2.glb");
