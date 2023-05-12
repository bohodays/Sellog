/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/items/katana_decoration_1.glb -t
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Katana: THREE.Mesh;
    Plane051: THREE.Mesh;
    Plane052: THREE.Mesh;
    Mesh: THREE.Mesh;
    Mesh_1: THREE.Mesh;
    Mesh_2: THREE.Mesh;
    Mesh_3: THREE.Mesh;
  };
  materials: {
    Wood: THREE.MeshStandardMaterial;
    ["Metal.001"]: THREE.MeshStandardMaterial;
    Metal: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
    ["Black Leather"]: THREE.MeshStandardMaterial;
  };
};

export function Katana_decoration_1(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/items/katana_decoration_1.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <ambientLight color={"#ffffff"} intensity={5} />
      <mesh
        geometry={nodes.Katana.geometry}
        material={materials.Wood}
        position={[0, 1.09, 0]}
        scale={0.78}
      >
        <mesh geometry={nodes.Plane051.geometry} material={materials.Wood} />
        <mesh geometry={nodes.Plane052.geometry} material={materials.Wood} />
        <group position={[0, 0.8, -0.44]} scale={0.67}>
          <mesh
            geometry={nodes.Mesh.geometry}
            material={materials["Metal.001"]}
          />
          <mesh geometry={nodes.Mesh_1.geometry} material={materials.Metal} />
          <mesh geometry={nodes.Mesh_2.geometry} material={materials.black} />
          <mesh
            geometry={nodes.Mesh_3.geometry}
            material={materials["Black Leather"]}
          />
        </group>
      </mesh>
    </group>
  );
}

// useGLTF.preload("/models/items/katana_decoration_1.glb");
