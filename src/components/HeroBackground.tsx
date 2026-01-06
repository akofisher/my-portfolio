import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x += delta * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#2563eb"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

export default function HeroBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      className="absolute inset-0 -z-10"
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <FloatingSphere />
    </Canvas>
  );
}
