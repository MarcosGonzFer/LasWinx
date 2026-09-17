import React, { useState } from 'react';
import { CLUB_IMAGES, OFFICIAL_SQUAD, TeamPlayer } from '../data/teamData';
import { Shirt, Sparkles, Check, ZoomIn, Eye, RotateCw } from 'lucide-react';

interface KitViewerProps {
  selectedPlayer: TeamPlayer;
  onSelectPlayer: (player: TeamPlayer) => void;
}

export const KitViewer: React.FC<KitViewerProps> = ({
  selectedPlayer,
  onSelectPlayer,
}) => {
  const [activeTab, setActiveTab] = useState<'PHOTO' | 'SIMULATOR'>('PHOTO');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);

  const displayPlayerName = customName.trim() ? customName.toUpperCase() : selectedPlayer.name.toUpperCase();
  const displayPlayerNumber = customNumber.trim() ? customNumber : selectedPlayer.number.toString();

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Cabecera de pestañas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            Equipación Oficial de Juego Kromex
          </span>
          <h3 className="text-2xl font-black text-white font-['Montserrat']">
            Blanco y Rosa • Diseño Kromex
          </h3>
          <p className="text-xs text-neutral-400">
            Fotografía oficial del conjunto: frontal con pantalón y trasera con serigrafía.
          </p>
        </div>

        <div className="flex rounded-xl bg-neutral-950 border border-neutral-800 p-1 text-xs shrink-0">
          <button
            onClick={() => setActiveTab('PHOTO')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'PHOTO'
                ? 'bg-pink-500 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Foto Oficial Kromex
          </button>
          <button
            onClick={() => setActiveTab('SIMULATOR')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'SIMULATOR'
                ? 'bg-pink-500 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Simulador de Dorsales
          </button>
        </div>
      </div>

      {activeTab === 'PHOTO' ? (
        /* VISTA 1: FOTO EXACTA KROMEX TAL CUAL LA ENVIÓ EL USUARIO */
        <div className="space-y-6">
          <div className="relative group rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-pink-500/30 overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.22),_rgba(10,10,15,1)_48%,_rgba(0,0,0,1)_100%)]">
            {/* Imagen oficial con fondo más integrado para amortiguar el blanco */}
            <img
              src={CLUB_IMAGES.kit}
              alt="Equipación Oficial Kromex Las Winx FC"
              className={`w-full max-h-[460px] object-contain transition-transform duration-300 drop-shadow-[0_22px_35px_rgba(0,0,0,0.45)] brightness-[0.96] contrast-[1.04] saturate-[0.9] ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              referrerPolicy="no-referrer"
            />

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 bg-neutral-900/90 hover:bg-neutral-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all"
            >
              <ZoomIn className="w-3.5 h-3.5 text-pink-400" />
              <span>{isZoomed ? 'Reducir' : 'Ampliar detalle'}</span>
            </button>
          </div>

          {/* Desglose de especificaciones de la foto */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                <Shirt className="w-4 h-4" />
                <span>Camiseta Frontal</span>
              </div>
              <p className="text-neutral-300">
                Base blanca transpirable, cuello en V bicolor rosa y negro, franjas laterales curvadas en rosa fucsia y escudo termosellado en el pecho.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Pantalón de Juego</span>
              </div>
              <p className="text-neutral-300">
                Rosa fucsia de alta visibilidad con paneles laterales en blanco, cintura elástica con cordón de ajuste blanco y dorsal #19 en pierna izquierda.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                <RotateCw className="w-4 h-4" />
                <span>Espalda Oficial</span>
              </div>
              <p className="text-neutral-300">
                Nombre del jugador en tipografía atlética condensada rosa y dorsal de gran visibilidad centrado para arbitraje.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA 2: SIMULADOR DE DORSALES INTERACTIVO */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mockup interactivo estilizado de la camiseta */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-60 sm:w-64 h-80 bg-white rounded-3xl border-4 border-pink-500/40 shadow-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden">
              {/* Franjas rosas laterales estilo Kromex */}
              <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-pink-500 to-rose-600"></div>
              <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-pink-500 to-rose-600"></div>

              {/* Cuello negro deportivo con detalle en amarillo */}
              <div className="absolute top-0 w-24 h-4 bg-neutral-900 rounded-b-2xl flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </div>

              {/* Mangas acentos */}
              <div className="absolute top-12 left-0 w-2 h-14 bg-neutral-900 rounded-r-md"></div>
              <div className="absolute top-12 right-0 w-2 h-14 bg-neutral-900 rounded-l-md"></div>

              {/* Nombre de jugador */}
              <div className="mt-6 mb-2">
                <span className="text-pink-500 font-black text-2xl uppercase tracking-wider font-['Montserrat'] block drop-shadow-sm">
                  {displayPlayerName}
                </span>
              </div>

              {/* Dorsal gigante */}
              <span className="text-pink-500 font-black text-7xl font-['Montserrat'] leading-none tracking-tight">
                {displayPlayerNumber}
              </span>

              {/* Detalle inferior */}
              <div className="mt-5 flex items-center gap-1.5 text-[11px] text-neutral-400 font-extrabold uppercase tracking-widest">
                <span>LAS WINX FC</span>
                <span>•</span>
                <span>KROMEX</span>
              </div>
            </div>
          </div>

          {/* Panel de Controles */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h4 className="text-lg font-bold text-white">
                Personaliza la Camiseta
              </h4>
              <p className="text-xs text-neutral-400">
                Selecciona a cualquiera de los 14 jugadores de la plantilla oficial o escribe un nombre para probar cómo se ve.
              </p>
            </div>

            {/* Selector de jugador rápido */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Seleccionar jugador oficial:
              </label>
              <select
                value={selectedPlayer.id}
                onChange={(e) => {
                  const found = OFFICIAL_SQUAD.find((p) => p.id === e.target.value);
                  if (found) {
                    onSelectPlayer(found);
                    setCustomName('');
                    setCustomNumber('');
                  }
                }}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-pink-500 font-medium"
              >
                {OFFICIAL_SQUAD.map((p) => (
                  <option key={p.id} value={p.id}>
                    #{p.number} - {p.name} (Talla {p.size} • {p.position})
                  </option>
                ))}
              </select>
            </div>

            {/* Inputs personalizados opcionales */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Nombre personalizado:
                </label>
                <input
                  type="text"
                  placeholder={selectedPlayer.name}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  maxLength={12}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Dorsal:
                </label>
                <input
                  type="number"
                  placeholder={selectedPlayer.number.toString()}
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value)}
                  min={1}
                  max={99}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <span className="font-bold text-pink-400">Datos Oficiales:</span>
              <p>Talla de juego para {selectedPlayer.name}: <strong>Talla {selectedPlayer.size}</strong></p>
              <p>Posición habitual: <strong>{selectedPlayer.position}</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
