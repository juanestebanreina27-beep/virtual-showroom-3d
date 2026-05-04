import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Modal from './components/Modal'
import UIOverlay from './components/UIOverlay'

interface ArtworkData {
  id: number
  title: string
  description: string
  color: string
  position: [number, number, number]
  rotation?: [number, number, number]
  type: 'frame' | 'sculpture' | 'installation'
}

const artworks: ArtworkData[] = [
  { id: 1, title: "Sinfonía Azul", description: "Una explosión de color y emoción que captura el momento exacto en que la luz atraviesa el vacío.", color: "#3b82f6", position: [-16, 3.2, -20], rotation: [0, 0.3, 0], type: 'frame' },
  { id: 2, title: "Equilibrio Geométrico", description: "Escultura cinética que representa el balance perfecto entre caos y orden.", color: "#64748b", position: [-12, 1.8, -8], type: 'sculpture' },
  { id: 3, title: "Luz Eterna", description: "Instalación luminosa que parece flotar en el tiempo. Una meditación sobre la eternidad.", color: "#a5b4fc", position: [0, 4.5, -18], type: 'installation' },
  { id: 4, title: "El Peso del Silencio", description: "Obra que invita a la contemplación profunda. El espacio entre las formas es tan importante como las formas mismas.", color: "#475569", position: [14, 3.1, -19], rotation: [0, -0.25, 0], type: 'frame' },
  { id: 5, title: "Forma y Vacío", description: "Escultura que juega con la percepción del espacio negativo y la presencia material.", color: "#e2e8f0", position: [-8, 2.2, 6], type: 'sculpture' },
  { id: 6, title: "Neón Urbano", description: "Homenaje a la estética cyberpunk y la energía de las ciudades nocturnas.", color: "#22d3ee", position: [17, 3.4, 4], rotation: [0, -0.4, 0], type: 'frame' },
  { id: 7, title: "Horizonte Digital", description: "Una visión futurista del paisaje contemporáneo donde lo digital y lo físico se fusionan.", color: "#6366f1", position: [0, 3.8, 14], type: 'installation' },
  { id: 8, title: "Esencia Metálica", description: "Torus infinito que representa la conexión eterna entre la materia y la energía.", color: "#94a3b8", position: [9, 2.5, -6], type: 'sculpture' },
]

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkData | null>(null)
  const [mode, setMode] = useState<'immersive' | 'free'>('immersive')
  const [isLocked, setIsLocked] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  const handleArtworkClick = (id: number) => {
    const artwork = artworks.find(a => a.id === id)
    if (artwork) {
      setSelectedArtwork(artwork)
    }
  }

  const closeModal = () => {
    setSelectedArtwork(null)
  }

  const handleExit = () => {
    window.location.reload()
  }

  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 1.7, 8], fov: 58 }}
        style={{ background: '#050505' }}
        shadows
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: true 
        }}
      >
        <Scene 
          mode={isMobile ? 'free' : mode} 
          onArtworkClick={handleArtworkClick} 
          artworks={artworks} 
        />
      </Canvas>

      <UIOverlay 
        mode={mode}
        setMode={setMode}
        isLocked={isLocked}
        onExit={handleExit}
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
      />

      <Modal 
        isOpen={!!selectedArtwork} 
        onClose={closeModal} 
        artwork={selectedArtwork} 
      />

      {/* Subtle vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
}
