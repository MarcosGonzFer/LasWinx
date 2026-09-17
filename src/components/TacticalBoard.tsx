import React, { useState } from 'react';
import { OFFICIAL_SQUAD, TeamPlayer } from '../data/teamData';
import { Users, Share2, Copy, Check, Shield } from 'lucide-react';

interface PositionSlot {
  key: 'por' | 'cie' | 'ali' | 'ald' | 'piv';
  title: string;
  xPercent: number; // percentage on court
  yPercent: number;
  defaultPlayerId: string;
}

const SLOTS: PositionSlot[] = [
  { key: 'por', title: 'Portero', xPercent: 12, yPercent: 50, defaultPlayerId: '14' }, // Nacho 80
  { key: 'cie', title: 'Cierre', xPercent: 32, yPercent: 50, defaultPlayerId: '13' }, // Héctor 47
  { key: 'ali', title: 'Ala Izq.', xPercent: 54, yPercent: 22, defaultPlayerId: '3' }, // Dani 7
  { key: 'ald', title: 'Ala Der.', xPercent: 54, yPercent: 78, defaultPlayerId: '4' }, // Pachi 8
  { key: 'piv', title: 'Pívot', xPercent: 82, yPercent: 50, defaultPlayerId: '10' }, // Marki 19
];

export const TacticalBoard: React.FC = () => {
  const [lineup, setLineup] = useState<{ [key: string]: string }>({
    por: '14', // Nacho 80
    cie: '13', // Héctor 47
    ali: '3',  // Dani 7
    ald: '4',  // Pachi 8
    piv: '10', // Marki 19
  });

  const [activeSlotKey, setActiveSlotKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getPlayerById = (id: string) => OFFICIAL_SQUAD.find((p) => p.id === id);

  const handleAssignPlayer = (playerId: string) => {
    if (!activeSlotKey) return;

    // Check if player is already in another slot
    const existingSlot = Object.keys(lineup).find((k) => lineup[k] === playerId);
    
    if (existingSlot && existingSlot !== activeSlotKey) {
      // Swap them
      const currentPlayerInTarget = lineup[activeSlotKey];
      setLineup({
        ...lineup,
        [existingSlot]: currentPlayerInTarget,
        [activeSlotKey]: playerId,
      });
    } else {
      setLineup({
        ...lineup,
        [activeSlotKey]: playerId,
      });
    }

    setActiveSlotKey(null);
  };

  // WhatsApp share text generator
  const getShareText = () => {
    const por = getPlayerById(lineup.por)?.name || 'Sin asignar';
    const cie = getPlayerById(lineup.cie)?.name || 'Sin asignar';
    const ali = getPlayerById(lineup.ali)?.name || 'Sin asignar';
    const ald = getPlayerById(lineup.ald)?.name || 'Sin asignar';
    const piv = getPlayerById(lineup.piv)?.name || 'Sin asignar';

    // Suplentes
    const startersIds = Object.values(lineup);
    const bench = OFFICIAL_SQUAD.filter((p) => !startersIds.includes(p.id))
      .map((p) => `${p.name} #${p.number}`)
      .join(', ');

    return `🔥 CONVOCATORIA LAS WINX FC 🔥\n\n⚽ 5 INICIAL:\n🧤 Portero: ${por}\n🛡️ Cierre: ${cie}\n⚡ Ala Izq: ${ali}\n⚡ Ala Der: ${ald}\n🎯 Pívot: ${piv}\n\n🔄 BANQUILLO:\n${bench}\n\n¡A por los 3 puntos en Getafe! 💪💖`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            Pizarra Táctica de Fútbol Sala
          </span>
          <h3 className="text-2xl font-black text-white font-['Montserrat']">
            Quinteto Inicial & Convocatoria
          </h3>
          <p className="text-xs text-neutral-400">
            Toca una posición en la pista para cambiar el jugador y comparte la alineación en WhatsApp con el equipo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-200 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-pink-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar 5 Inicial'}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-neutral-950 text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Enviar a WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PISTA REGLAMENTARIA DE FÚTBOL SALA */}
        <div className="lg:col-span-8">
          <div className="relative w-full aspect-[16/10] rounded-3xl border-4 border-white/80 p-4 shadow-2xl overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(31,41,55,0.28),_rgba(17,24,39,0.95)_55%,_rgba(2,6,23,1)_100%)] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_16px),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_16px)] before:bg-[length:18px_18px] before:opacity-50">
            {/* Líneas reglamentarias del campo */}
            <div className="absolute inset-2 border-2 border-white/60 rounded-2xl pointer-events-none"></div>
            {/* Línea de medio campo */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/60 pointer-events-none"></div>
            {/* Círculo central */}
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white/80"></span>
            </div>
            {/* Área izquierda (Portería) */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-20 sm:w-24 h-40 sm:h-48 border-r-2 border-y-2 border-white/60 rounded-r-3xl pointer-events-none"></div>
            {/* Portería izquierda */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-16 border-2 border-white/80 bg-white/30 rounded-r pointer-events-none"></div>
            {/* Área derecha */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-20 sm:w-24 h-40 sm:h-48 border-l-2 border-y-2 border-white/60 rounded-l-3xl pointer-events-none"></div>
            {/* Portería derecha */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-16 border-2 border-white/80 bg-white/30 rounded-l pointer-events-none"></div>

            {/* JUGADORES EN LA PISTA */}
            {SLOTS.map((slot) => {
              const assignedPlayer = getPlayerById(lineup[slot.key]);
              const isActive = activeSlotKey === slot.key;

              return (
                <button
                  key={slot.key}
                  onClick={() => setActiveSlotKey(isActive ? null : slot.key)}
                  style={{
                    left: `${slot.xPercent}%`,
                    top: `${slot.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
                    isActive ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  {/* Ficha circular con dorsal */}
                  <div
                    className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-black text-sm sm:text-base border-2 shadow-xl transition-all ${
                      slot.key === 'por'
                        ? 'bg-amber-400 text-neutral-950 border-white'
                        : 'bg-white text-pink-600 border-pink-500'
                    } ${isActive ? 'ring-4 ring-pink-400' : ''}`}
                  >
                    #{assignedPlayer?.number}
                  </div>

                  {/* Nombre del jugador */}
                  <div className="mt-1 px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-sm border border-neutral-700/60 text-center shadow">
                    <span className="text-[11px] sm:text-xs font-black text-white block leading-tight truncate max-w-[80px]">
                      {assignedPlayer?.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 text-center text-[11px] text-neutral-400">
            <span>Haz clic en cualquier posición del campo para cambiar quién sale de inicio</span>
          </div>
        </div>

        {/* LISTADO DE JUGADORES PARA ASIGNAR Y BANQUILLO */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>{activeSlotKey ? 'Asignar a ' + SLOTS.find(s => s.key === activeSlotKey)?.title : 'Plantilla / Suplentes'}</span>
              <span className="text-[10px] text-pink-400 font-normal">
                {activeSlotKey ? 'Toca para seleccionar' : '14 disponibles'}
              </span>
            </h4>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
              {OFFICIAL_SQUAD.map((player) => {
                const isStarter = Object.values(lineup).includes(player.id);
                const starterSlot = Object.keys(lineup).find((k) => lineup[k] === player.id);

                return (
                  <div
                    key={player.id}
                    onClick={() => {
                      if (activeSlotKey) {
                        handleAssignPlayer(player.id);
                      }
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                      activeSlotKey
                        ? 'cursor-pointer hover:bg-pink-500/20 hover:border-pink-500 border border-transparent'
                        : ''
                    } ${
                      isStarter
                        ? 'bg-neutral-900 border border-pink-500/40 text-white'
                        : 'bg-neutral-900/60 border border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-neutral-950 font-black text-pink-400 flex items-center justify-center border border-neutral-800 text-[11px]">
                        {player.number}
                      </span>
                      <div>
                        <span className="font-bold text-white block">
                          {player.name}
                        </span>
                      </div>
                    </div>

                    {isStarter ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        Titular
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-500 font-medium">
                        Banquillo
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
