/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/teddybear_1.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane056: THREE.Mesh;
    Cube015: THREE.Mesh;
    Cube016: THREE.Mesh;
    Roundcube014: THREE.Mesh;
    Roundcube015: THREE.Mesh;
    Roundcube016: THREE.Mesh;
    Roundcube017: THREE.Mesh;
    Roundcube018: THREE.Mesh;
    Roundcube019: THREE.Mesh;
    Roundcube020: THREE.Mesh;
  };
  materials: {
    Dark: THREE.MeshStandardMaterial;
    ["Dark.001"]: THREE.MeshStandardMaterial;
    ["Glass Dark"]: THREE.MeshPhysicalMaterial;
    ["White Gloss"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/teddybear_1.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane056.geometry}
        material={materials.Dark}
        position={[-0.02, -1.41, -0.09]}
        scale={1.34}
      >
        <mesh
          geometry={nodes.Cube015.geometry}
          material={materials.Dark}
          position={[0.14, 0.32, -0.05]}
        />
        <mesh
          geometry={nodes.Cube016.geometry}
          material={materials.Dark}
          position={[0.1, 0.08, 0.03]}
          scale={1.07}
        />
        <mesh
          geometry={nodes.Roundcube014.geometry}
          material={materials.Dark}
          position={[0, 0.42, -0.07]}
        />
        <mesh
          geometry={nodes.Roundcube015.geometry}
          material={materials["Dark.001"]}
          position={[0, 0.44, 0.1]}
          rotation={[0.3, 0, 0]}
        />
        <mesh
          geometry={nodes.Roundcube016.geometry}
          material={materials["Glass Dark"]}
          position={[0, 0.49, 0.17]}
        />
        <mesh
          geometry={nodes.Roundcube017.geometry}
          material={materials["White Gloss"]}
          position={[0.06, 0.55, 0.1]}
          rotation={[1.37, -0.15, -0.18]}
          scale={[1.29, 1.29, 1.63]}
        />
        <mesh
          geometry={nodes.Roundcube018.geometry}
          material={materials["Glass Dark"]}
          position={[0.05, 0.53, 0.12]}
          rotation={[1.44, -0.16, -0.08]}
          scale={[0.68, 0.68, 0.86]}
        />
        <mesh
          geometry={nodes.Roundcube019.geometry}
          material={materials.Dark}
          position={[0.14, 0.6, -0.07]}
          rotation={[0, 0, -0.97]}
          scale={0.07}
        />
        <mesh
          geometry={nodes.Roundcube020.geometry}
          material={materials["Dark.001"]}
          position={[-0.01, 0.17, 0.07]}
          rotation={[1.38, 0.02, 0.04]}
          scale={[0.94, 0.64, 0.62]}
        />
      </mesh>
    </group>
  );
}

// useGLTF.preload("/models/items/teddybear_1.glb");
