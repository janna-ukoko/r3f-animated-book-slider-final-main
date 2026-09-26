import { Environment, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { Book } from "./Book";

const CameraRig = () => {
  const { camera } = useThree();
  const targetPosition = useRef([
    -0.5,
    1,
    window.innerWidth > 800 ? 4 : 9,
  ]);

  useFrame((_, delta) => {
    easing.damp3(camera.position, targetPosition.current, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const Experience = () => {
  return (
    <>
      <CameraRig />
      <Float
        rotation-x={-Math.PI / 8}
        floatIntensity={0.3}
        speed={2}
        rotationIntensity={0.5}
      >
        <Book />
      </Float>
      <Environment preset="studio"></Environment>
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};