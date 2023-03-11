import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = () => {
  const computer = useGLTF('./retro_pc/scene.gltf')
  const computerRef = useRef();

  useFrame(() => {
    // swings the object like a pendulum.
    computerRef.current.rotation.y = (Math.sin(Date.now() * 0.0005) * Math.PI * 0.5) + 1.6 //helps with the orientation of the object;
  });

  return (
    <mesh ref={computerRef}>
      <hemisphereLight intensity={0.25} groundColor="black" />
      <pointLight intensity={2} position={[0, -1, 0]}/>
      <spotLight 
        position={[-20, 50, 10]}
      />
      <primitive 
        object={computer.scene}
        scale={2.8}
        position={[0, -2.5, 0]}
        rotation={[0, -0.25, 0]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI /2 }
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas