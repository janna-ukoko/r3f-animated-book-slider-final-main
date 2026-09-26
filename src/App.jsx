import { Loader, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  const { progress } = useProgress();
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIntroVisible(true); // overlay appears, fully opaque
      const timer = setTimeout(() => {
        setIntroVisible(false); // then begins fading out
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "black",
          zIndex: 9999,
          pointerEvents: introVisible ? "auto" : "none",
          opacity: introVisible ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />
      <UI />
      <Loader />
      <Canvas shadows camera={{
          position: [-50, 30, window.innerWidth > 800 ? -30 : -40],
          fov: 45,
        }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;