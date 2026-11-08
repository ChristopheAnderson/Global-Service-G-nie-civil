import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Grid, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, Moon, Layers, Compass, Sparkles } from 'lucide-react';

// Widescreen dimensions for the architectural monolith to naturally match 16:9 / 16:10 photos
const SCREEN_WIDTH = 5.2;
const SCREEN_HEIGHT = 3.25;
const SCREEN_DEPTH = 0.22;
const SCREEN_ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT; // 1.60

// Error Boundary to prevent any asset load failure from breaking the page
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ThreeErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn("3D Asset fallback engaged:", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Procedural BIM fallback structure displayed if texture is loading or unavailable
function FallbackBIMStructure({ nightMode, wireframeMode }: { nightMode: boolean; wireframeMode?: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_DEPTH]} />
        <meshStandardMaterial
          color={nightMode ? '#0F172A' : '#1E293B'}
          metalness={0.8}
          roughness={0.2}
          wireframe={true}
        />
      </mesh>
      <mesh position={[0, 0, SCREEN_DEPTH / 2 + 0.01]}>
        <planeGeometry args={[SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.9]} />
        <meshStandardMaterial
          color="#D97706"
          metalness={0.9}
          roughness={0.1}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

// Realistic 3D Architectural Display Terminal with un-distorted aspect-ratio framing
function RealisticBuildingDisplay({
  imageSrc,
  wireframeMode,
  nightMode,
}: {
  imageSrc: string;
  wireframeMode: boolean;
  nightMode: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(imageSrc);

  // Auto-fit texture to geometry preserving exact aspect ratio without ANY distortion (cover mode)
  useMemo(() => {
    if (texture.image) {
      const imgWidth = texture.image.width || 1920;
      const imgHeight = texture.image.height || 1080;
      const imgAspect = imgWidth / imgHeight;

      if (imgAspect > SCREEN_ASPECT) {
        // Image is wider than plane -> crop left & right evenly
        const scale = SCREEN_ASPECT / imgAspect;
        texture.repeat.set(scale, 1);
        texture.offset.set((1 - scale) / 2, 0);
      } else {
        // Image is taller than plane -> crop top & bottom evenly
        const scale = imgAspect / SCREEN_ASPECT;
        texture.repeat.set(1, scale);
        texture.offset.set(0, (1 - scale) / 2);
      }

      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Gentle floating sway
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.12;
      meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.04;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* 1. Main Display Monolith */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_DEPTH]} />
        {/* Right face */}
        <meshStandardMaterial attach="material-0" color={nightMode ? '#020617' : '#1E293B'} metalness={0.85} roughness={0.2} />
        {/* Left face */}
        <meshStandardMaterial attach="material-1" color={nightMode ? '#020617' : '#1E293B'} metalness={0.85} roughness={0.2} />
        {/* Top face with bronze chamfer */}
        <meshStandardMaterial attach="material-2" color="#D97706" metalness={0.9} roughness={0.15} />
        {/* Bottom face */}
        <meshStandardMaterial attach="material-3" color="#0F172A" metalness={0.9} roughness={0.25} />
        {/* Front Face: High-Res Photorealistic Building Texture with ZERO distortion */}
        <meshStandardMaterial
          attach="material-4"
          map={texture}
          metalness={nightMode ? 0.3 : 0.08}
          roughness={nightMode ? 0.3 : 0.35}
          wireframe={wireframeMode}
          emissive={nightMode ? '#1E3A8A' : '#000000'}
          emissiveIntensity={nightMode ? 0.25 : 0}
        />
        {/* Back Face: Architectural Technical Plate */}
        <meshStandardMaterial
          attach="material-5"
          color="#0B132B"
          metalness={0.9}
          roughness={0.2}
          wireframe={true}
        />
      </mesh>

      {/* 2. Precision Chamfered Metallic Frame Border */}
      <mesh position={[0, 0, SCREEN_DEPTH / 2 + 0.005]}>
        <ringGeometry args={[0, 0, 4]} />
      </mesh>

      {/* Top Bevel Bar (Amber precision strip) */}
      <mesh position={[0, SCREEN_HEIGHT / 2 + 0.04, 0]}>
        <boxGeometry args={[SCREEN_WIDTH + 0.12, 0.06, SCREEN_DEPTH + 0.04]} />
        <meshStandardMaterial color="#D97706" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Bottom Bevel Bar */}
      <mesh position={[0, -SCREEN_HEIGHT / 2 - 0.04, 0]}>
        <boxGeometry args={[SCREEN_WIDTH + 0.12, 0.06, SCREEN_DEPTH + 0.04]} />
        <meshStandardMaterial color={nightMode ? '#020617' : '#1E293B'} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Bevel Bar */}
      <mesh position={[-SCREEN_WIDTH / 2 - 0.04, 0, 0]}>
        <boxGeometry args={[0.06, SCREEN_HEIGHT + 0.14, SCREEN_DEPTH + 0.04]} />
        <meshStandardMaterial color={nightMode ? '#020617' : '#1E293B'} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Right Bevel Bar */}
      <mesh position={[SCREEN_WIDTH / 2 + 0.04, 0, 0]}>
        <boxGeometry args={[0.06, SCREEN_HEIGHT + 0.14, SCREEN_DEPTH + 0.04]} />
        <meshStandardMaterial color={nightMode ? '#020617' : '#1E293B'} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Corner Architectural Braces (Cadmium Amber) */}
      {[
        [-SCREEN_WIDTH / 2 - 0.02, SCREEN_HEIGHT / 2 + 0.02],
        [SCREEN_WIDTH / 2 + 0.02, SCREEN_HEIGHT / 2 + 0.02],
        [-SCREEN_WIDTH / 2 - 0.02, -SCREEN_HEIGHT / 2 - 0.02],
        [SCREEN_WIDTH / 2 + 0.02, -SCREEN_HEIGHT / 2 - 0.02],
      ].map(([x, y], idx) => (
        <group key={idx} position={[x, y, SCREEN_DEPTH / 2 + 0.015]}>
          <mesh>
            <boxGeometry args={[0.22, 0.22, 0.02]} />
            <meshStandardMaterial color="#D97706" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* 4. Real 3D Structural BIM Wireframe Overlay (Visible in Wireframe Mode) */}
      {wireframeMode && (
        <group position={[0, 0, 0]}>
          {/* External Structural Grid Columns */}
          {[-2.2, -1.1, 0, 1.1, 2.2].map((x, cIdx) => (
            <mesh key={cIdx} position={[x, 0, 0.25]}>
              <cylinderGeometry args={[0.025, 0.025, SCREEN_HEIGHT + 0.4, 8]} />
              <meshBasicMaterial color="#0284C7" wireframe={true} />
            </mesh>
          ))}

          {/* Horizontal Structural Slabs */}
          {[-1.2, -0.4, 0.4, 1.2].map((y, sIdx) => (
            <mesh key={sIdx} position={[0, y, 0.25]}>
              <boxGeometry args={[SCREEN_WIDTH + 0.3, 0.03, 0.1]} />
              <meshBasicMaterial color="#D97706" wireframe={true} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// Floating atmospheric particle motes
function FloatingParticles({ count = 60 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return coords;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D97706"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

interface ArchitecturalHero3DProps {
  className?: string;
}

export const ArchitecturalHero3D: React.FC<ArchitecturalHero3DProps> = ({ className = '' }) => {
  const [wireframe, setWireframe] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Hand-picked authentic high-res 16:9 engineering & building photos
  const buildingOptions = [
    { 
      id: 'batiment-moderne', 
      label: 'Complexe Tertiaire R+6', 
      tag: 'Gros Œuvre & Bureaux',
      src: '/images/btp-asset-02.jpg' 
    },
    { 
      id: 'tour-vitree', 
      label: "Siège d'Affaires Contemporain", 
      tag: 'Bâtiment Haute Performance',
      src: '/images/btp-asset-12.jpg' 
    },
    { 
      id: 'ouvrages-art', 
      label: "Ouvrage d'Art & Génie Civil", 
      tag: 'Infrastructures & Dalots',
      src: '/images/btp-asset-03.jpg' 
    },
  ];
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState(0);

  const currentBuilding = buildingOptions[selectedBuildingIndex];

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Canvas with Realistic Texture & Inertial Rotation */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 44 }}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
      >
        {/* Realistic Lighting Scene */}
        <ambientLight intensity={nightMode ? 0.4 : 0.9} color={nightMode ? '#60A5FA' : '#FFFFFF'} />
        
        {/* Sun Key Light */}
        <directionalLight
          position={[6, 8, 8]}
          intensity={nightMode ? 0.35 : 1.3}
          color={nightMode ? '#93C5FD' : '#FFFDF5'}
        />

        {/* Orange Architectural Rim Light */}
        <pointLight
          position={[-4, 3, 4]}
          intensity={nightMode ? 2.5 : 1.4}
          color="#D97706"
          distance={16}
        />

        {/* Fill from bottom */}
        <pointLight
          position={[0, -3.5, 3]}
          intensity={nightMode ? 1.4 : 0.7}
          color={nightMode ? '#1D4ED8' : '#64748B'}
          distance={12}
        />

        {/* Blueprint Ground Grid */}
        <Grid
          position={[0, -2.4, 0]}
          args={[16, 16]}
          cellSize={0.6}
          cellThickness={1}
          cellColor={nightMode ? '#0284C7' : '#94A3B8'}
          sectionSize={2.4}
          sectionThickness={1.5}
          sectionColor="#D97706"
          fadeDistance={16}
          fadeStrength={1.5}
        />

        {/* Floating Realistic Monolith */}
        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
          <ThreeErrorBoundary fallback={<FallbackBIMStructure nightMode={nightMode} wireframeMode={wireframe} />}>
            <React.Suspense fallback={<FallbackBIMStructure nightMode={nightMode} wireframeMode={wireframe} />}>
              <RealisticBuildingDisplay
                imageSrc={currentBuilding.src}
                wireframeMode={wireframe}
                nightMode={nightMode}
              />
            </React.Suspense>
          </ThreeErrorBoundary>
        </Float>

        {/* Floating Construction Dust Particles */}
        <FloatingParticles count={60} />

        {/* Orbit Controls for Free 3D Drag & Rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minPolarAngle={Math.PI / 3}
          autoRotate={!isInteracting}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Top Engineering HUD Overlay (Responsive) */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex flex-col gap-1 font-mono text-[10px]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-slate-100 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold uppercase tracking-wider text-[10px] sm:text-[11px] text-white">
            {currentBuilding.label}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/[0.08] text-slate-400 text-[9px]">
          <span>{currentBuilding.tag}</span>
          <span>•</span>
          <span>CONTRÔLE: <strong className="text-amber-400">EUROCODES 2</strong></span>
        </div>
      </div>

      {/* Building View Selector (Top Right) */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-full border border-white/[0.1] shadow-lg">
        {buildingOptions.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => setSelectedBuildingIndex(i)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all ${
              selectedBuildingIndex === i
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vue {i + 1}
          </button>
        ))}
      </div>

      {/* Floating HUD Controls (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 sm:gap-2">
        {/* Day/Night Lighting Toggle */}
        <button
          onClick={() => setNightMode(!nightMode)}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 border shadow-md ${
            nightMode
              ? 'bg-sky-600/40 text-sky-200 border-sky-400/50'
              : 'bg-slate-950/80 text-slate-400 border-white/[0.1] hover:text-white'
          }`}
          title={nightMode ? 'Passer en éclairage diurne' : 'Passer en éclairage nocturne'}
          aria-label="Mode jour / nuit"
        >
          {nightMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Wireframe / Structure Mode Toggle */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 border shadow-md ${
            wireframe
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-950/80 text-slate-300 border-white/[0.1] hover:border-amber-500/40 hover:text-white'
          }`}
          title="Basculer entre la vue filaire structurelle et le rendu photoréaliste"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${wireframe ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`}
          />
          <span>{wireframe ? 'Mode BIM' : 'Vue 3D'}</span>
        </button>
      </div>

      {/* Interactive Drag Cursor Hint (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[10px] text-slate-400 font-mono bg-slate-950/80 px-3 py-1 rounded-md border border-white/[0.08]">
        <Compass className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>ROTATION 360° À LA SOURIS</span>
      </div>
    </div>
  );
};
