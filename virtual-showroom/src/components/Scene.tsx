import { useRef, useEffect } from 'react'
import { PointerLockControls, OrbitControls, Grid } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Artwork from './Artwork'

interface SceneProps {
  mode: 'immersive' | 'free'
  onArtworkClick: (id: number) => void
  artworks: any[]
}

function MovementController({ mode }: { mode: 'immersive' | 'free' }) {
  const { camera } = useThree()
  const keys = useRef<Record<string, boolean>>({})
  const velocity = useRef({ x: 0, y: 0, z: 0 })
  const isJumping = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true
      if (e.key === ' ' && !isJumping.current) {
        isJumping.current = true
        velocity.current.y = 9
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (mode !== 'immersive') return

    const speed = 12
    const direction = new THREE.Vector3()

    if (keys.current['w'] || keys.current['arrowup']) direction.z -= 1
    if (keys.current['s'] || keys.current['arrowdown']) direction.z += 1
    if (keys.current['a'] || keys.current['arrowleft']) direction.x -= 1
    if (keys.current['d'] || keys.current['arrowright']) direction.x += 1

    direction.normalize().multiplyScalar(speed * delta)

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)

    const move = new THREE.Vector3()
    move.addScaledVector(forward, direction.z)
    move.addScaledVector(right, direction.x)

    camera.position.add(move)

    // Gravity & Jump
    velocity.current.y -= 28 * delta
    camera.position.y += velocity.current.y * delta

    if (camera.position.y < 1.65) {
      camera.position.y = 1.65
      velocity.current.y = 0
      isJumping.current = false
    }

    // Límites del showroom
    camera.position.x = Math.max(-22, Math.min(22, camera.position.x))
    camera.position.z = Math.max(-22, Math.min(22, camera.position.z))
  })

  return null
}

export default function Scene({ mode, onArtworkClick, artworks }: SceneProps) {
  return (
    <>
      <fog attach="fog" args={['#050505', 18, 95]} />
      <ambientLight intensity={0.35} />
      
      <directionalLight
        position={[12, 28, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
      />
      
      <pointLight position={[-18, 8, -18]} intensity={0.6} color="#6366f1" />
      <pointLight position={[18, 12, 15]} intensity={0.5} color="#a5b4fc" />

      {/* Suelo con grid premium */}
      <Grid 
        position={[0, 0.01, 0]} 
        args={[60, 60]} 
        cellSize={1.2} 
        cellColor="#27272a" 
        sectionColor="#3f3f46"
        fadeDistance={45}
      />

      {/* Suelo base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#111113" />
      </mesh>

      {/* Paredes arquitectónicas */}
      <mesh position={[0, 6, -24]} rotation={[0, 0, 0]} receiveShadow castShadow>
        <planeGeometry args={[52, 14]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[-25, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[52, 14]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[25, 6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[52, 14]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>

      {/* Pilares decorativos */}
      {[-18, 18].map((x, i) => (
        <mesh key={i} position={[x, 5.5, -22]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 11, 6]} />
          <meshStandardMaterial color="#27272a" metalness={0.6} />
        </mesh>
      ))}

      {/* Obras de arte */}
      {artworks.map((art) => (
        <Artwork
          key={art.id}
          {...art}
          onClick={onArtworkClick}
        />
      ))}

      {/* Controles */}
      {mode === 'immersive' && (
        <>
          <PointerLockControls />
          <MovementController mode={mode} />
        </>
      )}
      {mode === 'free' && (
        <OrbitControls 
          enableDamping 
          dampingFactor={0.08} 
          minDistance={4} 
          maxDistance={45}
          target={[0, 4, 0]}
        />
      )}
    </>
  )
}
