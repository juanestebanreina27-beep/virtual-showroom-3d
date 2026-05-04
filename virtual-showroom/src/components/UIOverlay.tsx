import { useState } from 'react'
import { X, Move, Mouse, Space } from 'lucide-react'

interface UIOverlayProps {
  mode: 'immersive' | 'free'
  setMode: (mode: 'immersive' | 'free') => void
  isLocked: boolean
  onExit: () => void
  showInstructions: boolean
  setShowInstructions: (show: boolean) => void
}

export default function UIOverlay({ 
  mode, setMode, isLocked, onExit, showInstructions, setShowInstructions 
}: UIOverlayProps) {
  const [showStart, setShowStart] = useState(true)

  const handleStart = () => {
    setShowStart(false)
    setShowInstructions(true)
  }

  if (showStart) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-[4px] text-indigo-400">PLUS X VIRTUAL EXPERIENCE</div>
          </div>
          
          <h1 className="text-7xl font-semibold tracking-tighter text-white mb-4">SHOWROOM 3D</h1>
          <p className="text-2xl text-zinc-400 max-w-md mx-auto">Explora la colección de arte contemporáneo en un espacio inmersivo</p>
          
          <button 
            onClick={handleStart}
            className="mt-12 px-16 py-5 rounded-3xl bg-white text-black text-lg font-semibold tracking-wide hover:bg-zinc-200 active:scale-[0.985] transition-all shadow-xl"
          >
            ENTRAR AL SHOWROOM
          </button>
          
          <div className="mt-8 text-xs text-zinc-500">Recomendado en escritorio • Usa auriculares para mejor experiencia</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-zinc-950/90 border border-zinc-800 px-5 py-2 rounded-2xl text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          EN VIVO
        </div>
        <div className="h-3 w-px bg-zinc-800" />
        <button 
          onClick={() => setMode(mode === 'immersive' ? 'free' : 'immersive')}
          className="px-4 py-1 rounded-xl hover:bg-zinc-900 transition-colors text-xs"
        >
          {mode === 'immersive' ? 'MODO LIBRE (ÓRBITA)' : 'MODO INMERSIVO'}
        </button>
      </div>

      {/* Exit button */}
      <button 
        onClick={onExit}
        className="fixed top-6 right-6 z-40 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm hover:bg-red-950/80 transition-all"
      >
        <X size={16} /> SALIR
      </button>

      {/* Instructions */}
      {showInstructions && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-950/95 border border-zinc-800 px-8 py-5 rounded-3xl text-sm max-w-md text-center">
          <div className="flex justify-center gap-8 mb-4 text-zinc-400">
            <div className="flex items-center gap-2"><Move size={18} /> WASD</div>
            <div className="flex items-center gap-2"><Mouse size={18} /> Mirar</div>
            <div className="flex items-center gap-2"><Space size={18} /> Saltar</div>
          </div>
          <div className="text-xs text-zinc-500">Haz clic en cualquier obra para ver detalles • Presiona ESC para liberar el cursor</div>
          
          <button 
            onClick={() => setShowInstructions(false)}
            className="mt-4 text-xs underline text-zinc-500 hover:text-white"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Mobile hint */}
      <div className="fixed bottom-4 right-4 z-40 text-[10px] text-zinc-500 md:hidden">
        Modo táctil activo • Arrastra para girar
      </div>
    </>
  )
}
