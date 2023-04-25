import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, OrthographicCamera } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh;
    Bone: THREE.Bone;
    Bone003: THREE.Bone;
    Bone005: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

type ActionName = "default" | "walk";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Ilbuni(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/ilbuni.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions | any>(animations, group);

  useEffect(() => {
    actions["default"]?.play();
    // actions["walk"]?.play();
  });
  console.log(actions["default"]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* 카메라 */}
        <OrthographicCamera
          makeDefault={true}
          left={-(window.innerWidth / window.innerHeight)}
          right={window.innerWidth / window.innerHeight}
          top={1}
          bottom={-1}
          near={-1000}
          far={1000}
          zoom={0.2}
          position={[1, 5, 5]}
        />
        <group name="Armature" position={[0, -0.17, 0]} scale={0.33}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone003} />
          <primitive object={nodes.Bone005} />
          <skinnedMesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            skeleton={nodes.Cube.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/ilbuni.glb");
