/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/characters/m3.glb -t
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    m_12: THREE.SkinnedMesh;
    root: THREE.Bone;
    ["MCH-torsoparent"]: THREE.Bone;
  };
  materials: {
    characters: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Idle" | "Run" | "Sad" | "Song Jump" | "Walk" | "Win";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function M3_Main(props: JSX.IntrinsicElements["group"] | any) {
  const group = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/characters/m3.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions | any>(animations, group);

  return (
    <group ref={props.group} dispose={null} position={[0, 0.3, 0]}>
      <group name="Scene">
        <group
          name="rig"
          position={[0, -0.17, 0]}
          castShadow={true}
          receiveShadow={true}
          ref={props.userModelRef}
        >
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-torsoparent"]} />
          <skinnedMesh
            name="m_12"
            geometry={nodes.m_12.geometry}
            material={materials.characters}
            skeleton={nodes.m_12.skeleton}
            castShadow={true}
            receiveShadow={true}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/characters/m3.glb");
