import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Loader from "../Loader";

const Computers = ({ scale }) => {
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <group
        position={[0, -1, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
        scale={scale}
      >
        <mesh>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0, -1.2, 0.5]}>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[2.6, 1.6, 0.01]} />
          <meshStandardMaterial
            color="#0f3460"
            emissive="#0f3460"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[2.5, 1.5]} />
          <meshBasicMaterial color="#4a0080" opacity={0.8} transparent />
        </mesh>
      </group>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 500px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers scale={isMobile ? 0.7 : 1} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
