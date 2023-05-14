/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/characters/m2.glb -t
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    m_11: THREE.SkinnedMesh;
    root: THREE.Bone;
    ["MCH-torsoparent"]: THREE.Bone;
  };
  materials: {
    characters: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Idle" | "Run" | "Sad" | "Song Jump" | "Walk" | "Win";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function M2_CS(props: JSX.IntrinsicElements["group"] | any) {
  const group = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/csQuiz/m2.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions | any>(animations, group);

  return (
    <group ref={props.group} dispose={null} position={[0, 0.2, 0]}>
      <group name="Scene">
        <group
          name="rig"
          position={props.isLeft < 0 ? [2, -0.17, 0] : [-2, -0.17, 0]}
          castShadow={true}
          receiveShadow={true}
          ref={props.otherUserModelRef}
          visible={false}
        >
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-torsoparent"]} />
          <skinnedMesh
            name="m_11"
            geometry={nodes.m_11.geometry}
            material={materials.characters}
            skeleton={nodes.m_11.skeleton}
            castShadow={true}
            receiveShadow={true}
          />
        </group>
      </group>
    </group>
  );
}
