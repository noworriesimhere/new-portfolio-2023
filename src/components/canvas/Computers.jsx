import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./retro_pc/scene.gltf')
  const computerRef = useRef();

  useFrame(() => {
    // swings the object like a pendulum.
    computerRef.current.rotation.y = (Math.sin(Date.now() * 0.0005) * Math.PI * 0.5) + 1.6 //helps with the orientation of the object;
  });

  return (
    <mesh ref={computerRef}>
      <hemisphereLight intensity={0.25} groundColor="black" />
      <pointLight intensity={1} position={[0, 0, 0]}/>
      <spotLight 
        position={[-20, 50, 10]}
        angle={12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 1.9 : 2.8}
        position={isMobile ? [0, -1, 0] : [0, -2.5, 0]}
        rotation={[0, -0.25, 0]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

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
        <Computers isMobile={isMobile} />      
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas