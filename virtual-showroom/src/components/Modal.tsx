import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  artwork: {
    title: string
    description: string
    color: string
  } | null
}

export default function Modal({ isOpen, onClose, artwork }: ModalProps) {
  if (!isOpen || !artwork) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div 
        className="modal relative w-full max-w-lg mx-4 rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
          <div>
            <div className="text-xs uppercase tracking-[3px] text-indigo-400 font-medium">COLECCIÓN 2026</div>
            <h2 className="text-3xl font-semibold text-white tracking-tighter">{artwork.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 -mr-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Visual Preview */}
        <div 
          className="h-72 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${artwork.color}22, #000000)` }}
        >
          <div 
            className="w-48 h-48 rounded-full border-[12px] border-white/30 flex items-center justify-center"
            style={{ backgroundColor: artwork.color + '33' }}
          >
            <div className="text-center">
              <div className="text-6xl mb-2">✧</div>
              <div className="text-xs text-white/60 tracking-widest">OBRA DIGITAL</div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:4px_4px]" />
        </div>

        {/* Description */}
        <div className="px-8 py-8">
          <p className="text-zinc-400 leading-relaxed text-[15px]">
            {artwork.description}
          </p>
          
          <div className="mt-8 flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl bg-white text-black font-medium text-sm tracking-wide hover:bg-zinc-200 transition-all active:scale-[0.985]"
            >
              CERRAR
            </button>
            <button 
              className="flex-1 py-3.5 rounded-2xl border border-zinc-700 text-white font-medium text-sm tracking-wide hover:bg-zinc-900 transition-all"
            >
              VER EN REALIDAD AUMENTADA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
