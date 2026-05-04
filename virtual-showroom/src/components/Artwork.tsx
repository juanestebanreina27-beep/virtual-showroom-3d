import { useRef } from 'react'
import { Mesh } from 'three'
import { ThreeEvent } from '@react-three/fiber'

interface ArtworkProps {
  id: number
  title: string
  color: string
  position: [number, number, number]
  rotation?: [number, number, number]
  type: 'frame' | 'sculpture' | 'installation'
  onClick: (id: number) => void
}

export default function Artwork({ id, color, position, rotation = [0, 0, 0], type, onClick }: ArtworkProps) {
  const meshRef = useRef<Mesh>(null!)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onClick(id)
  }

  const commonProps = {
    castShadow: true,
    receiveShadow: true,
    onClick: handleClick,
  }

  if (type === 'frame') {
    return (
      <group position={position} rotation={rotation}>
        {/* Marco exterior metálico */}
        <mesh {...commonProps} position={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 4.2, 0.3]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Interior de la obra */}
        <mesh {...commonProps} position={[0, 0, 0.2]}>
          <planeGeometry args={[2.8, 3.8]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.3}
            metalness={0.1} 
            roughness={0.6} 
          />
        </mesh>
        
        {/* Borde luminoso sutil */}
        <mesh position={[0, 0, 0.35]}>
          <planeGeometry args={[3.1, 4.1]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#a5b4fc" 
            emissiveIntensity={0.15}
            transparent 
            opacity={0.15} 
          />
        </mesh>
      </group>
    )
  }

  if (type === 'sculpture') {
    return (
      <group position={position} rotation={rotation}>
        {/* Pedestal */}
        <mesh position={[0, -0.8, 0]} {...commonProps}>
          <cylinderGeometry args={[1.1, 1.3, 1.6, 6]} />
          <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.4} />
        </mesh>
        
        {/* Escultura principal */}
        <mesh ref={meshRef} position={[0, 1.2, 0]} {...commonProps}>
          <torusKnotGeometry args={[1.1, 0.35, 180, 20, 2, 5]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.15} 
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    )
  }

  // Installation (luz / esfera flotante)
  return (
    <group position={position} rotation={rotation}>
      <mesh {...commonProps}>
        <sphereGeometry args={[1.4]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.8}
          metalness={0.8} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Anillos decorativos */}
      <mesh rotation={[1, 0.5, 0]} {...commonProps}>
        <torusGeometry args={[2.1, 0.08, 32, 64]} />
        <meshStandardMaterial color="#e0e7ff" emissive="#6366f1" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}
