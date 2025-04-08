"use client";

import { Float, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";

const FloatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 200]}
        scale={hovered ? 2.8 : 2.5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#6366f1" : "#4f46e5"}
          metalness={0.8}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.01;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={torusRef} position={[2, 0, -2]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.8}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

const FloatingCubes = () => {
  const cubes = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    cubes.current.forEach((cube, index) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
    });
  });

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={1 + i * 0.5}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <mesh
            ref={(el) => (cubes.current[i] = el!)}
            position={[Math.sin(i) * 2, Math.cos(i) * 2, -2]}
            scale={0.5}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#6366f1" : "#4f46e5"}
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const FloatingText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={textRef} position={[-2, 0, -3]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.1} />
      </mesh>
    </Float>
  );
};

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <FloatingSphere />
          <FloatingTorus />
          <FloatingCubes />
          <FloatingText />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
          />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-1"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.1),rgba(0,0,0,0))] z-1"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.05),rgba(0,0,0,0))] z-1"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-indigo-400 font-medium mb-4 block text-lg tracking-wider">
                Hi, I&apos;m
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight">
                Ansh Gera
              </h1>
              <h2 className="text-3xl md:text-4xl text-gray-300 mb-8 font-light tracking-wide">
                Full Stack Developer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 mb-12 leading-relaxed max-w-xl tracking-wide"
            >
              Creating beautiful and functional web experiences with modern
              technologies and innovative solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 text-lg font-medium shadow-lg tracking-wide"
              >
                View Projects
              </motion.a>
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 border-2 border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-500/10 transition-all duration-300 text-lg font-medium tracking-wide"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative h-[600px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-md">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <FloatingSphere />
                  <FloatingTorus />
                  <FloatingCubes />
                  <FloatingText />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                  />
                </Canvas>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors duration-300"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
