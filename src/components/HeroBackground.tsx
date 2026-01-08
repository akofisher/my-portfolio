import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null!);

  const isDragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!mesh.current) return;

    // 🌍 Always auto rotate (base motion)
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x += delta * 0.1;

    // 🌀 Apply inertia after dragging
    if (!isDragging.current) {
      mesh.current.rotation.y += velocity.current.x * delta;
      mesh.current.rotation.x += velocity.current.y * delta;

      // Friction
      velocity.current.x *= 0.94;
      velocity.current.y *= 0.94;
    }
  });

  const onPointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  const onPointerMove = (e: any) => {
    if (!isDragging.current || !mesh.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    last.current = { x: e.clientX, y: e.clientY };

    const speed = 0.005;

    mesh.current.rotation.y += dx * speed;
    mesh.current.rotation.x += dy * speed;

    // Store velocity for inertia
    velocity.current.x = dx * speed * 18;
    velocity.current.y = dy * speed * 18;
  };

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh
        ref={mesh}
        scale={2.2}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
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
      className="absolute inset-0 pointer-events-auto"
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <FloatingSphere />
    </Canvas>
  );
}
