import React, { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  CLUB_INFO,
  CLUB_IMAGES,
  OFFICIAL_SQUAD,
  LEAGUE_CALENDAR,
  TeamPlayer,
} from '../data/teamData';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Download,
  Share2,
  Check,
  Image,
} from 'lucide-react';

// Convierte 'DD-MM-YYYY' a un objeto Date válido
const parseJornadaDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

// Elige por defecto la próxima jornada sin jugar; si ya pasaron todas, la última
const getDefaultJornadaNumber = (): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = LEAGUE_CALENDAR.find((j) => parseJornadaDate(j.date) >= today);
  return (upcoming ?? LEAGUE_CALENDAR[LEAGUE_CALENDAR.length - 1]).number;
};

// Configuración de las chispitas mágicas (destellos) repartidas por el póster
const SPARKLES = [
  { top: '6%', left: '88%', size: 14, rotate: 12, opacity: 0.9 },
  { top: '14%', left: '10%', size: 10, rotate: -18, opacity: 0.55 },
  { top: '32%', left: '92%', size: 9, rotate: 30, opacity: 0.5 },
  { top: '46%', left: '6%', size: 12, rotate: -8, opacity: 0.6 },
  { top: '68%', left: '90%', size: 11, rotate: 20, opacity: 0.45 },
  { top: '86%', left: '12%', size: 9, rotate: -25, opacity: 0.4 },
  { top: '92%', left: '80%', size: 13, rotate: 5, opacity: 0.55 },
];

// Pequeño destello de cuatro puntas, estilo "polvo de hadas"
const Sparkle: React.FC<{ size: number; rotate: number; opacity: number }> = ({
  size,
  rotate,
  opacity,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ transform: `rotate(${rotate}deg)`, opacity }}
  >
    <path
      d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z"
      fill="#f9a8d4"
    />
  </svg>
);

// Silueta suave de ala de hada, usada como marca de agua decorativa
const FairyWing: React.FC<{ id: string; className?: string; flip?: boolean }> = ({
  id,
  className = '',
  flip = false,
}) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <path
      d="M10 100 C 40 30, 110 10, 150 40 C 120 55, 100 70, 95 95 C 130 85, 165 95, 180 130 C 140 140, 105 130, 90 105 C 85 135, 60 165, 20 175 C 35 140, 45 110, 35 90 C 20 100, 12 105, 10 100 Z"
      fill={`url(#${id})`}
    />
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const formatLongDate = (dateStr: string): string => {
  const date = parseJornadaDate(dateStr);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const MatchdaySquad: React.FC = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const [jornadaNumber, setJornadaNumber] = useState<number>(getDefaultJornadaNumber());
  const [kickoffTime, setKickoffTime] = useState('10:00');
  const [venue, setVenue] = useState(CLUB_INFO.pavilion);
  const [calledUpIds, setCalledUpIds] = useState<string[]>(
    OFFICIAL_SQUAD.map((p) => p.id)
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);

  const jornada = useMemo(
    () => LEAGUE_CALENDAR.find((j) => j.number === jornadaNumber) ?? LEAGUE_CALENDAR[0],
    [jornadaNumber]
  );

  const calledUpPlayers: TeamPlayer[] = useMemo(
    () =>
      OFFICIAL_SQUAD.filter((p) => calledUpIds.includes(p.id)).sort(
        (a, b) => a.number - b.number
      ),
    [calledUpIds]
  );

  const togglePlayer = (id: string) => {
    setCalledUpIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const selectAll = () => setCalledUpIds(OFFICIAL_SQUAD.map((p) => p.id));
  const clearAll = () => setCalledUpIds([]);

  // Detecta en el primer render si el navegador puede compartir archivos (móvil)
  React.useEffect(() => {
    const nav = navigator as Navigator & {
      canShare?: (data?: ShareData) => boolean;
    };
    if (nav.canShare && nav.share) {
      setCanShareFiles(true);
    }
  }, []);

  const buildFileName = () =>
    `convocatoria-j${jornada.number}-vs-${jornada.winxMatch.rival
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`;

  const generatePng = async (): Promise<string> => {
    if (!posterRef.current) throw new Error('No se pudo generar la imagen');
    // pixelRatio alto para que salga nítida en Instagram/WhatsApp
    return toPng(posterRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: '#09090b',
    });
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const dataUrl = await generatePng();
      const link = document.createElement('a');
      link.download = buildFileName();
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsGenerating(true);
      const dataUrl = await generatePng();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], buildFileName(), { type: 'image/png' });

      const nav = navigator as Navigator & {
        canShare?: (data?: ShareData) => boolean;
      };

      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({
          files: [file],
          title: `Convocatoria Las Winx FC - Jornada ${jornada.number}`,
          text: `Convocatoria vs ${jornada.winxMatch.rival}`,
        });
      } else {
        await handleDownload();
      }
    } catch (err) {
      // El usuario puede cancelar el share sheet; no es un error real
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            Para el Community Manager
          </span>
          <h3 className="text-2xl font-black text-white font-['Montserrat']">
            Generador de Convocatoria
          </h3>
          <p className="text-xs text-neutral-400">
            Elige la jornada y los jugadores convocados, y descarga la imagen lista para publicar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CONTROLES */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selección de jornada */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              Partido
            </h4>

            <select
              value={jornadaNumber}
              onChange={(e) => setJornadaNumber(Number(e.target.value))}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-pink-500 cursor-pointer"
            >
              {LEAGUE_CALENDAR.map((j) => (
                <option key={j.number} value={j.number}>
                  Jornada {j.number} · {j.winxMatch.isHome ? 'vs' : '@'} {j.winxMatch.rival} · {j.date}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] text-neutral-500 font-semibold uppercase block mb-1">
                  Hora
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    value={kickoffTime}
                    onChange={(e) => setKickoffTime(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-neutral-500 font-semibold uppercase block mb-1">
                  Pabellón
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Pabellón"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Selección de jugadores */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-pink-400" />
                Convocados ({calledUpPlayers.length}/{OFFICIAL_SQUAD.length})
              </h4>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <button onClick={selectAll} className="text-pink-400 hover:text-pink-300 cursor-pointer">
                  Todos
                </button>
                <span className="text-neutral-700">/</span>
                <button onClick={clearAll} className="text-neutral-500 hover:text-neutral-300 cursor-pointer">
                  Ninguno
                </button>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
              {OFFICIAL_SQUAD.map((player) => {
                const isCalled = calledUpIds.includes(player.id);
                return (
                  <label
                    key={player.id}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all border ${
                      isCalled
                        ? 'bg-neutral-900 border-pink-500/40 text-white'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-neutral-950 font-black text-pink-400 flex items-center justify-center border border-neutral-800 text-[11px] shrink-0">
                        {player.number}
                      </span>
                      <div>
                        <span className="font-bold block">{player.name}</span>
                        <span className="text-[10px] text-neutral-500">{player.position}</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isCalled}
                      onChange={() => togglePlayer(player.id)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleDownload}
              disabled={isGenerating || calledUpPlayers.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{isGenerating ? 'Generando…' : downloaded ? '¡Descargada!' : 'Descargar imagen'}</span>
            </button>

            {canShareFiles && (
              <button
                onClick={handleShare}
                disabled={isGenerating || calledUpPlayers.length === 0}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>
            )}
          </div>

          {calledUpPlayers.length === 0 && (
            <p className="text-[11px] text-amber-400/80 text-center">
              Selecciona al menos un jugador para generar la convocatoria.
            </p>
          )}
        </div>

        {/* PREVIEW DE LA IMAGEN */}
        <div className="lg:col-span-7 flex flex-col items-center gap-3">
          <div className="w-full max-w-[420px] mx-auto">
            <div
              ref={posterRef}
              className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col justify-between p-6"
              style={{
                background:
                  'radial-gradient(circle at 20% 0%, rgba(244,114,182,0.30), transparent 45%), radial-gradient(circle at 100% 100%, rgba(244,114,182,0.18), transparent 40%), linear-gradient(180deg, #170f1a 0%, #1c1220 45%, #0a0a0d 100%)',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {/* Fondo mágico: alas y destellos de hadas */}
              <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
                <FairyWing id="wingTopRight" className="absolute -top-6 -right-10 w-44 h-44" />
                <FairyWing id="wingBottomLeft" className="absolute -bottom-8 -left-10 w-40 h-40" flip />
                {SPARKLES.map((s, i) => (
                  <span
                    key={i}
                    className="absolute"
                    style={{ top: s.top, left: s.left }}
                  >
                    <Sparkle size={s.size} rotate={s.rotate} opacity={s.opacity} />
                  </span>
                ))}
              </div>

              {/* Cabecera */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={CLUB_IMAGES.crest}
                      alt="Escudo Las Winx FC"
                      className="w-11 h-11 object-contain drop-shadow-md"
                      crossOrigin="anonymous"
                    />
                    <div>
                      <p
                        className="text-white font-black leading-none text-base"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        LAS WINX <span className="text-pink-400">FC</span>
                      </p>
                      <p className="text-[9px] text-neutral-400 font-semibold uppercase tracking-wider">
                        {CLUB_INFO.city}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-pink-500 text-white text-[10px] font-black uppercase tracking-wider shadow">
                    Jornada {jornada.number}
                  </span>
                </div>

                <div className="mt-5 text-center">
                  <span
                    className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-pink-400"
                  >
                    Convocatoria
                  </span>
                  <h2
                    className="text-white font-black text-2xl leading-tight mt-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {jornada.winxMatch.isHome
                      ? `LAS WINX FC vs ${jornada.winxMatch.rival}`
                      : `${jornada.winxMatch.rival} vs LAS WINX FC`}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-neutral-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-pink-400" />
                      {formatLongDate(jornada.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-pink-400" />
                      {kickoffTime}h
                    </span>
                    {venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-pink-400" />
                        {venue}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Lista de convocados */}
              <div className="relative flex-1 mt-5 grid grid-cols-2 gap-x-3 gap-y-1.5 content-start">
                {calledUpPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5"
                  >
                    <span className="w-5 h-5 shrink-0 rounded-full bg-pink-500/90 text-white text-[10px] font-black flex items-center justify-center">
                      {player.number}
                    </span>
                    <span className="text-[11px] font-bold text-white truncate">
                      {player.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] text-neutral-500 font-semibold">
                  {CLUB_INFO.league}
                </span>
                <span className="text-[10px] text-pink-400 font-bold">
                  @{CLUB_INFO.instagram}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-neutral-500 flex items-center gap-1.5">
            <Image className="w-3 h-3" />
            Vista previa a escala — la imagen se descarga en alta resolución.
          </p>
        </div>
      </div>
    </div>
  );
};