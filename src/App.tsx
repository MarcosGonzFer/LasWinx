import React, { useState } from 'react';
import teamPhoto from './assets/images/imagenjugadores.jpeg';

import fotoChusy from './assets/images/fotochusy.jpeg';
import { 
  CLUB_INFO, 
  CLUB_IMAGES, 
  OFFICIAL_SQUAD, 
  LEAGUE_CALENDAR,
  VICTORY_MOMENTS,
  JornadaData,
  TeamPlayer 
} from './data/teamData';
import { 
  Instagram, 
  MapPin, 
  Search, 
  Shirt, 
  Calendar, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Filter,
  Trophy,
  Users,
  Flame,
  Share2,
  Check
} from 'lucide-react';
import { OfficialCrest } from './components/OfficialCrest';
import { MatchCountdown } from './components/MatchCountdown';
import { KitViewer } from './components/KitViewer';
import { TacticalBoard } from './components/TacticalBoard';
import { TeamStats } from './components/TeamStats';
import { LeagueTable } from './components/LeagueTable';
import { MatchPoll } from './components/MatchPoll';
import { MatchdaySquad } from './components/MatchdaySquad'; // ← añadir esta línea

export default function App() {
  const [calendarViewMode, setCalendarViewMode] = useState<'WINX_ONLY' | 'ALL_MATCHES'>('WINX_ONLY');
  const [selectedRound, setSelectedRound] = useState<'ALL' | 'PRIMERA' | 'SEGUNDA'>('ALL');
  const [calendarSearch, setCalendarSearch] = useState('');
  
  const [searchSquad, setSearchSquad] = useState('');
  const [filterSize, setFilterSize] = useState<'ALL' | 'M' | 'L'>('ALL');
  const [selectedPlayer, setSelectedPlayer] = useState<TeamPlayer>(OFFICIAL_SQUAD[0]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filtrado de plantilla
  const filteredSquad = OFFICIAL_SQUAD.filter((player) => {
    const matchesQuery = 
      player.name.toLowerCase().includes(searchSquad.toLowerCase()) ||
      player.number.toString().includes(searchSquad.trim()) ||
      player.position.toLowerCase().includes(searchSquad.toLowerCase());
    const matchesSize = filterSize === 'ALL' || player.size === filterSize;
    return matchesQuery && matchesSize;
  });

  // Filtrado de calendario
  const filteredJornadas = LEAGUE_CALENDAR.filter((jornada) => {
    const matchesRound = 
      selectedRound === 'ALL' ||
      (selectedRound === 'PRIMERA' && jornada.round === 'Primera vuelta') ||
      (selectedRound === 'SEGUNDA' && jornada.round === 'Segunda vuelta');

    if (!matchesRound) return false;

    if (!calendarSearch.trim()) return true;

    const q = calendarSearch.toLowerCase();
    const matchesWinx = 
      jornada.winxMatch.rival.toLowerCase().includes(q) ||
      jornada.winxMatch.home.toLowerCase().includes(q) ||
      jornada.winxMatch.away.toLowerCase().includes(q) ||
      jornada.number.toString() === q;

    const matchesAny = jornada.matches.some(
      (m) => m.home.toLowerCase().includes(q) || m.away.toLowerCase().includes(q)
    );

    return matchesWinx || matchesAny;
  });

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Las Winx FC - Web Oficial',
        text: '¡Echa un ojo a la web oficial de Las Winx FC con el calendario de las 22 jornadas, equipación Kromex y la plantilla!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getPlayerCardImage = (player: TeamPlayer) => {
    if (player.name === 'Chusy') return fotoChusy;
    return null;
  };

  const hasVictoryMoments = VICTORY_MOMENTS.some(
    (moment) =>
      moment.title ||
      moment.date ||
      moment.competition ||
      moment.score ||
      moment.opponent ||
      moment.description ||
      moment.image
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-['Outfit',sans-serif] selection:bg-pink-500 selection:text-white pb-12 winx-page-shell">
      <div className="winx-magic-layer" aria-hidden="true">
        <span className="magic-glow glow-1"></span>
        <span className="magic-glow glow-2"></span>
        <span className="magic-glow glow-3"></span>
        <span className="magic-particle particle-1"></span>
        <span className="magic-particle particle-2"></span>
        <span className="magic-particle particle-3"></span>
        <span className="magic-particle particle-4"></span>
        <span className="magic-particle particle-5"></span>
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <OfficialCrest size="sm" />
            <div>
              <span className="font-extrabold text-lg tracking-tight font-['Montserrat'] text-white">
                Las Winx <span className="text-pink-400">FC</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-neutral-400 font-medium">
                Getafe • Fútbol Sala
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-5 text-xs font-semibold">
            <a href="#equipacion" className="text-neutral-300 hover:text-pink-400 hidden md:block transition-colors">
              Equipación
            </a>
            <a href="#tactica" className="text-neutral-300 hover:text-pink-400 hidden lg:block transition-colors">
              Pizarra 5 Inicial
            </a>
            <a href="#convocatoria" className="text-neutral-300 hover:text-pink-400 hidden lg:block transition-colors">
  Convocatoria
</a>
            <a href="#victorias" className="text-neutral-300 hover:text-pink-400 hidden md:block transition-colors">
              Victorias
            </a>
            <a href="#plantilla" className="text-neutral-300 hover:text-pink-400 hidden sm:block transition-colors">
              Plantilla
            </a>
            <a href="#calendario" className="text-neutral-300 hover:text-pink-400 hidden sm:block transition-colors">
              Calendario (22J)
            </a>
            <a href="#pichichi" className="text-neutral-300 hover:text-pink-400 hidden lg:block transition-colors">
              Pichichi
            </a>
            <a href="#clasificacion" className="text-neutral-300 hover:text-pink-400 hidden xl:block transition-colors">
              Clasificación
            </a>

            <button
              onClick={handleShareApp}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-all cursor-pointer"
              title="Compartir enlace de la web"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-pink-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
            </button>

            <a
              href={CLUB_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@{CLUB_INFO.instagram}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-10">
        {/* HERO OFICIAL */}
        <section className="hero-showcase border border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>

          <div className="hero-fairy-scene" aria-hidden="true">
            <div className="fairy-fly fairy-one">
              <span className="fairy-wing wing-left"></span>
              <span className="fairy-wing wing-right"></span>
              <span className="fairy-body"></span>
            </div>
            <div className="fairy-fly fairy-two">
              <span className="fairy-wing wing-left"></span>
              <span className="fairy-wing wing-right"></span>
              <span className="fairy-body"></span>
            </div>
            <div className="fairy-fly fairy-three">
              <span className="fairy-wing wing-left"></span>
              <span className="fairy-wing wing-right"></span>
              <span className="fairy-body"></span>
            </div>
          </div>

          <div className="hero-grid relative z-10">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-dot"></span>
                <span>{CLUB_INFO.league}</span>
              </div>

              <h1 className="hero-title">
                LAS WINX <span className="text-gradient">FC</span>
              </h1>

              <p className="hero-subtitle">
                El club oficial de amigos de fútbol sala en Getafe. Blanco y rosa por bandera, seriedad en la pista, garra hasta el último minuto y los mejores terceros tiempos.
              </p>

              <div className="hero-actions">
                <a href="#equipacion" className="hero-cta-primary">
                  Ver equipación
                </a>
                <a href="#plantilla" className="hero-cta-secondary">
                  Ver plantilla
                </a>
              </div>

              <div className="hero-meta">
                <div className="hero-pill">
                  <span className="hero-pill-dot hero-pill-dot-light"></span>
                  <span className="hero-pill-dot hero-pill-dot-pink"></span>
                  <span>Blanco y Rosa</span>
                </div>

                <div className="hero-pill">
                  <Shirt className="w-3.5 h-3.5 text-pink-400" />
                  <span>Kromex Oficial</span>
                </div>

                <div className="hero-pill">
                  <Users className="w-3.5 h-3.5 text-pink-400" />
                  <span>14 Jugadores</span>
                </div>

                <div className="hero-pill">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  <span>22 Jornadas</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="crest-orbit"></div>
              <div className="crest-frame">
                <img
                  src={CLUB_IMAGES.crest}
                  alt="Escudo Oficial Las Winx FC"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          </div>
        </section>

        {/* CUENTA ATRÁS EN VIVO AL DEBUT (JORNADA 1) */}
        <section>
          <MatchCountdown targetDateStr="2026-09-27T10:00:00" />
        </section>

        {/* VICTORIAS / FOTOS DE PARTIDOS GANADOS */}
        <section id="victorias" className="victory-section bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                MOMENTOS VICTORIA
              </span>
              <h2 className="text-2xl font-black text-white font-['Montserrat']">
                Fotos cuando ganamos
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Este bloque está preparado para ir añadiendo fotos de cada triunfo sin depender de una base de datos.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-pink-300">
              <Trophy className="w-3.5 h-3.5" />
              0 VICTORIAS AÚN
            </div>
          </div>

          {!hasVictoryMoments ? (
            <div className="victory-empty-panel mt-6" aria-label="Sin victorias aún">
              <div className="victory-empty-inner" />
            </div>
          ) : (
            <div className="victory-gallery mt-6">
              {VICTORY_MOMENTS.map((moment) => (
                <article key={moment.id} className="victory-card group">
                  <div className="victory-image-wrap">
                    <img
                      src={moment.image || CLUB_IMAGES.crest}
                      alt={moment.title || 'Victoria'}
                      className="victory-image"
                      referrerPolicy="no-referrer"
                    />
                    <div className="victory-overlay">
                      <span className="victory-badge">
                        <Trophy className="w-3.5 h-3.5" />
                        Victoria
                      </span>
                      <span className="victory-score">{moment.score || 'x - x'}</span>
                    </div>
                  </div>

                  <div className="victory-content">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-black text-white font-['Montserrat']">{moment.title || 'Victoria'}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-pink-300">
                        {moment.date || 'dd mm yyyy'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-300">
                      <span>{moment.competition || 'Competición'}</span>
                      <span className="font-bold text-pink-400">vs {moment.opponent || 'Rival'}</span>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-neutral-400">
                      {moment.description || 'Aquí va la descripción real de la victoria cuando la pongas.'}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* PLANTILLA OFICIAL (14 JUGADORES) */}
        <section id="plantilla" className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                Plantilla Oficial 2026/27
              </span>
              <h2 className="text-2xl font-black text-white font-['Montserrat']">
                Los 14 Jugadores de Las Winx
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Tallas oficiales de camiseta, posiciones y dorsales. Haz clic en cualquiera para seleccionarlo.
              </p>
            </div>

            {/* Filtros de talla y buscador */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex rounded-xl bg-neutral-950 border border-neutral-800 p-1 text-xs">
                <button
                  onClick={() => setFilterSize('ALL')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    filterSize === 'ALL'
                      ? 'bg-pink-500 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Todos ({OFFICIAL_SQUAD.length})
                </button>
                <button
                  onClick={() => setFilterSize('L')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    filterSize === 'L'
                      ? 'bg-pink-500 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Talla L (10)
                </button>
                <button
                  onClick={() => setFilterSize('M')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    filterSize === 'M'
                      ? 'bg-pink-500 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Talla M (4)
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar jugador..."
                  value={searchSquad}
                  onChange={(e) => setSearchSquad(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-pink-500 w-36 sm:w-44"
                />
              </div>
            </div>
          </div>

          {/* Grid de Jugadores */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 justify-center">
            {filteredSquad.map((player, index) => {
              const isSelected = selectedPlayer.id === player.id;
              const cardImage = getPlayerCardImage(player);
              const isLastPair = index >= filteredSquad.length - 2;

              return (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className={`group cursor-pointer rounded-2xl p-3 text-center transition-all border relative ${
                    isSelected
                      ? 'bg-neutral-950 border-pink-500 shadow-lg shadow-pink-500/20 -translate-y-1 ring-1 ring-pink-500'
                      : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-950'
                  } ${isLastPair ? 'md:col-span-2 md:justify-self-center md:w-[calc(50%-0.625rem)]' : ''}`}
                >
                  <div className="mb-3 h-40 sm:h-48 md:h-52 w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    {cardImage ? (
                      <img
                        src={cardImage}
                        alt={player.name}
                        className="w-full h-full object-cover bg-neutral-950"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-black text-pink-300">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <h3 className="font-extrabold text-white text-sm sm:text-base truncate">
                    {player.name}
                  </h3>

                  <div
                    className={`mt-2.5 mx-auto w-12 h-12 rounded-full flex items-center justify-center font-['Montserrat'] font-black text-base transition-all ${
                      isSelected
                        ? 'bg-pink-500 text-white shadow-sm border border-white/40'
                        : 'bg-neutral-900 text-pink-400 border border-neutral-800 group-hover:border-pink-500/50'
                    }`}
                  >
                    {player.number}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EQUIPACIÓN OFICIAL KROMEX (FOTO EXACTA + SIMULADOR) */}
        <section id="equipacion">
          <KitViewer 
            selectedPlayer={selectedPlayer}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        </section>

        {/* PIZARRA TÁCTICA 5 INICIAL FÚTBOL SALA */}
        <section id="tactica">
          <TacticalBoard />
        </section>

        <section id="convocatoria">
  <MatchdaySquad />
</section>

        {/* CALENDARIO COMPLETO (22 JORNADAS) */}
        <section id="calendario" className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                Calendario Oficial Getafe
              </span>
              <h2 className="text-2xl font-black text-white font-['Montserrat']">
                Las 22 Jornadas de Liga
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Todas las fechas oficiales de la temporada: Primera Vuelta (J1-J11) y Segunda Vuelta (J12-J22).
              </p>
            </div>

            {/* Controles de Vista y Búsqueda */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-neutral-950 border border-neutral-800 p-1 text-xs">
                <button
                  onClick={() => setCalendarViewMode('WINX_ONLY')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    calendarViewMode === 'WINX_ONLY'
                      ? 'bg-pink-500 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Partidos Las Winx
                </button>
                <button
                  onClick={() => setCalendarViewMode('ALL_MATCHES')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    calendarViewMode === 'ALL_MATCHES'
                      ? 'bg-pink-500 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Jornada Completa
                </button>
              </div>

              <div className="flex rounded-xl bg-neutral-950 border border-neutral-800 p-1 text-xs">
                <button
                  onClick={() => setSelectedRound('ALL')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedRound === 'ALL' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Todas (22)
                </button>
                <button
                  onClick={() => setSelectedRound('PRIMERA')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedRound === 'PRIMERA' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  1ª Vuelta
                </button>
                <button
                  onClick={() => setSelectedRound('SEGUNDA')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedRound === 'SEGUNDA' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  2ª Vuelta
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar rival..."
                  value={calendarSearch}
                  onChange={(e) => setCalendarSearch(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-pink-500 w-36"
                />
              </div>
            </div>
          </div>

          {/* Listado de Jornadas */}
          {calendarViewMode === 'WINX_ONLY' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredJornadas.map((jornada) => {
                const { winxMatch, number, date, round } = jornada;
                const isDebut = number === 1;

                return (
                  <div
                    key={number}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDebut
                        ? 'bg-neutral-950 border-pink-500 shadow-md shadow-pink-500/10 ring-1 ring-pink-500/50'
                        : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs pb-2.5 mb-2.5 border-b border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-white">Jornada {number}</span>
                        {isDebut && (
                          <span className="px-1.5 py-0.5 rounded bg-pink-500 text-[10px] font-bold text-white">
                            Debut
                          </span>
                        )}
                      </div>
                      <span className="text-neutral-400 text-[11px] font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        {date}
                      </span>
                    </div>

                    <div className="space-y-2 py-1">
                      {/* Local */}
                      <div
                        className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold ${
                          winxMatch.home === 'LAS WINX'
                            ? 'bg-pink-500/15 border border-pink-500/40 text-pink-300 font-bold'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {winxMatch.home === 'LAS WINX' && (
                            <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0"></span>
                          )}
                          <span className="truncate">{winxMatch.home}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400 uppercase">
                          Local
                        </span>
                      </div>

                      {/* Visitante */}
                      <div
                        className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold ${
                          winxMatch.away === 'LAS WINX'
                            ? 'bg-pink-500/15 border border-pink-500/40 text-pink-300 font-bold'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {winxMatch.away === 'LAS WINX' && (
                            <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0"></span>
                          )}
                          <span className="truncate">{winxMatch.away}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400 uppercase">
                          Visitante
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="text-neutral-500">{round}</span>
                      <span className="font-semibold text-pink-400">
                        Rival: {winxMatch.rival}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJornadas.map((jornada) => (
                <div
                  key={jornada.number}
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-white font-['Montserrat'] text-sm sm:text-base">
                        Jornada {jornada.number}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-[11px]">
                        {jornada.round}
                      </span>
                    </div>
                    <span className="font-bold text-pink-400 flex items-center gap-1 text-xs sm:text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {jornada.date}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {jornada.matches.map((m, idx) => {
                      const isWinxMatch = m.home === 'LAS WINX' || m.away === 'LAS WINX';

                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                            isWinxMatch
                              ? 'bg-pink-500/15 border-pink-500/50 text-white font-bold shadow-sm'
                              : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <span className={`truncate ${m.home === 'LAS WINX' ? 'text-pink-300 font-extrabold' : ''}`}>
                            {m.home}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400 font-bold shrink-0">
                            VS
                          </span>
                          <span className={`truncate text-right ${m.away === 'LAS WINX' ? 'text-pink-300 font-extrabold' : ''}`}>
                            {m.away}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PICHICHI & ESTADÍSTICAS */}
        <section id="pichichi">
          <TeamStats />
        </section>

        {/* CLASIFICACIÓN GENERAL */}
        <section id="clasificacion">
          <LeagueTable />
        </section>

        {/* PORRA DE AMIGOS */}
        <section id="porra">
          <MatchPoll />
        </section>

        {/* INSTAGRAM BANNER */}
        <section className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-pink-950/40 border border-pink-500/30 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto">
            <Instagram className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-black text-white font-['Montserrat']">
            Instagram Oficial: @{CLUB_INFO.instagram}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
            Sigue las convocatorias, mejores jugadas y fotos de cada jornada de liga en Getafe.
          </p>

          <div>
            <a
              href={CLUB_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver Perfil de Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 mt-16 pt-8 pb-4 text-xs text-neutral-500 max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <OfficialCrest size="sm" />
            <span className="font-bold text-neutral-300">Las Winx FC</span>
            <span>• Fútbol Sala Getafe 2026/27</span>
          </div>

          <p>Equipación Oficial Kromex • Blanco y Rosa</p>
        </div>
      </footer>
    </div>
  );
}
