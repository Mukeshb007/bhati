import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ position, type, color }: { position: [number, number, number], type: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'sphere':
        return new THREE.SphereGeometry(0.8, 32, 32);
      case 'box':
        return new THREE.BoxGeometry(1.2, 1.2, 1.2);
      case 'torus':
        return new THREE.TorusGeometry(1, 0.4, 16, 100);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [type]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.2,
      metalness: 0.8,
      roughness: 0.2,
    });
  }, [color]);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry} material={material} />
  );
}

function Scene() {
  const shapes = useMemo(() => [
    { position: [-4, 2, -2] as [number, number, number], type: 'sphere', color: '#F7DF1E' },
    { position: [4, -1, -3] as [number, number, number], type: 'box', color: '#61DAFB' },
    { position: [-2, -3, -1] as [number, number, number], type: 'torus', color: '#4FC08D' },
    { position: [3, 3, -4] as [number, number, number], type: 'sphere', color: '#FF6B6B' },
    { position: [-5, -1, -5] as [number, number, number], type: 'box', color: '#4ECDC4' },
    { position: [1, -4, -2] as [number, number, number], type: 'torus', color: '#45B7D1' },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}