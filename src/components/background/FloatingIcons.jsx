import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Particles() {
  const ref = useRef()
  const count = 60

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.012
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ebb94d"
        size={0.055}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}

function ArchIcon({ type, position, offset }) {
  const ref = useRef()
  const baseY = position[1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
    ref.current.rotation.x += 0.001
    ref.current.position.y =
      baseY + Math.sin(clock.elapsedTime * 0.5 + offset) * 0.3
  })

  const isWireframe = ['box', 'octahedron', 'torus'].includes(type)
  const color = isWireframe ? '#7a5900' : '#ebb94d'
  const opacity = isWireframe ? 0.22 : 0.14

  return (
    <mesh ref={ref} position={position}>
      {type === 'box' && <boxGeometry args={[0.65, 0.65, 0.65]} />}
      {type === 'plane' && <planeGeometry args={[1.0, 0.72]} />}
      {type === 'sphere' && <sphereGeometry args={[0.34, 14, 14]} />}
      {type === 'torus' && <torusGeometry args={[0.32, 0.1, 8, 22]} />}
      {type === 'octahedron' && <octahedronGeometry args={[0.4]} />}
      {type === 'cylinder' && <cylinderGeometry args={[0.18, 0.18, 0.65, 8]} />}
      <meshBasicMaterial color={color} wireframe={isWireframe} transparent opacity={opacity} />
    </mesh>
  )
}

const ICONS = [
  { type: 'box',        position: [-3.4,  0.9, -1.2], offset: 0.0 },
  { type: 'plane',      position: [ 2.9, -0.4,  0.3], offset: 1.2 },
  { type: 'sphere',     position: [ 0.4,  1.5, -1.8], offset: 2.4 },
  { type: 'torus',      position: [-2.0, -1.3,  0.9], offset: 0.8 },
  { type: 'octahedron', position: [ 3.4,  0.7, -0.7], offset: 1.8 },
  { type: 'cylinder',   position: [-3.0, -0.4, -0.2], offset: 3.2 },
  { type: 'box',        position: [ 1.3, -1.6,  0.6], offset: 2.0 },
  { type: 'sphere',     position: [-0.8,  0.5,  1.2], offset: 0.5 },
]

function Scene() {
  return (
    <>
      <Particles />
      {ICONS.map((icon, i) => (
        <ArchIcon key={i} {...icon} />
      ))}
    </>
  )
}

export default function FloatingIcons() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#f9f9f9', width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
