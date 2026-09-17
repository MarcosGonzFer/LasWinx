import exactCrest from '../assets/images/escudo.jpeg';
import exactKit from '../assets/images/imagenequipacion.jpeg';

export const CLUB_IMAGES = {
  crest: exactCrest,
  kit: exactKit,
};

export interface TeamPlayer {
  id: string;
  name: string;
  number: number;
  size: 'M' | 'L';
  position: 'Portero' | 'Cierre' | 'Ala' | 'Pívot';
  preferredFoot?: 'Diestro' | 'Zurdo';
  goals?: number;
  assists?: number;
  matchesPlayed?: number;
}

export const LEAGUE_TEAMS = [
  'LAS WINX',
  'LATIN BROTHER',
  'BLUE DRAGON',
  'DEPORTIVO RESACON',
  'FS CASARRUBUELOS',
  'PUNTOS VERANO CF',
  'PLANE PLANET FC',
  'JOLIMBOS',
  'TARZAN S23',
  'FIGURINES FC',
  'TUPESACOS',
  'CALIFORNICIO',
];

export const OFFICIAL_SQUAD: TeamPlayer[] = [
  { id: '1', name: 'Marcos', number: 4, size: 'L', position: 'Cierre', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '2', name: 'Serrano', number: 5, size: 'L', position: 'Cierre', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '3', name: 'Dani', number: 7, size: 'L', position: 'Ala', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '4', name: 'Pachi', number: 8, size: 'L', position: 'Ala', preferredFoot: 'Zurdo', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '5', name: 'Ivan', number: 9, size: 'L', position: 'Pívot', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '6', name: 'Pablox', number: 10, size: 'L', position: 'Ala', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '7', name: 'Feru', number: 11, size: 'L', position: 'Ala', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '8', name: 'Villa', number: 12, size: 'M', position: 'Ala', preferredFoot: 'Zurdo', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '9', name: 'Exposi', number: 16, size: 'M', position: 'Ala', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '10', name: 'Marki', number: 19, size: 'L', position: 'Pívot', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '11', name: 'Pablo', number: 21, size: 'M', position: 'Ala', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '12', name: 'Chusy', number: 22, size: 'M', position: 'Pívot', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '13', name: 'Héctor', number: 47, size: 'L', position: 'Cierre', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
  { id: '14', name: 'Nacho', number: 80, size: 'L', position: 'Portero', preferredFoot: 'Diestro', goals: 0, assists: 0, matchesPlayed: 0 },
];

export const CLUB_INFO = {
  name: 'Las Winx FC',
  league: 'Liga Local de Fútbol Sala de Getafe',
  pavilion: 'Polideportivo Municipal de Getafe',
  city: 'Getafe (Madrid)',
  colors: 'Blanco y Rosa',
  kitSupplier: 'Kromex',
  instagram: 'laswinxfc',
  instagramUrl: 'https://www.instagram.com/laswinxfc',
};

export interface VictoryMoment {
  id: string;
  title: string;
  date: string;
  competition: string;
  score: string;
  opponent: string;
  image?: string;
  description: string;
}

export const VICTORY_MOMENTS: VictoryMoment[] = [
  {
    id: 'v1',
    title: '',
    date: '',
    competition: '',
    score: '',
    opponent: '',
    image: '',
    description: '',
  },
];

export interface MatchPair {
  home: string;
  away: string;
}

export interface JornadaData {
  number: number;
  date: string;
  round: 'Primera vuelta' | 'Segunda vuelta';
  matches: MatchPair[];
  winxMatch: {
    rival: string;
    isHome: boolean;
    home: string;
    away: string;
  };
}

export const LEAGUE_CALENDAR: JornadaData[] = [
  // Primera vuelta
  {
    number: 1,
    date: '27-09-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'LATIN BROTHER', isHome: false, home: 'LATIN BROTHER', away: 'LAS WINX' },
    matches: [
      { home: 'BLUE DRAGON', away: 'DEPORTIVO RESACON' },
      { home: 'PUNTOS VERANO CF', away: 'FS CASARRUBUELOS' },
      { home: 'LATIN BROTHER', away: 'LAS WINX' },
      { home: 'JOLIMBOS', away: 'PLANE PLANET FC' },
      { home: 'FIGURINES FC', away: 'TARZAN S23' },
      { home: 'TUPESACOS', away: 'CALIFORNICIO' },
    ],
  },
  {
    number: 2,
    date: '04-10-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'PUNTOS VERANO CF', isHome: true, home: 'LAS WINX', away: 'PUNTOS VERANO CF' },
    matches: [
      { home: 'DEPORTIVO RESACON', away: 'TUPESACOS' },
      { home: 'FS CASARRUBUELOS', away: 'BLUE DRAGON' },
      { home: 'LAS WINX', away: 'PUNTOS VERANO CF' },
      { home: 'PLANE PLANET FC', away: 'LATIN BROTHER' },
      { home: 'TARZAN S23', away: 'JOLIMBOS' },
      { home: 'CALIFORNICIO', away: 'FIGURINES FC' },
    ],
  },
  {
    number: 3,
    date: '18-10-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'BLUE DRAGON', isHome: false, home: 'BLUE DRAGON', away: 'LAS WINX' },
    matches: [
      { home: 'DEPORTIVO RESACON', away: 'FS CASARRUBUELOS' },
      { home: 'BLUE DRAGON', away: 'LAS WINX' },
      { home: 'PUNTOS VERANO CF', away: 'PLANE PLANET FC' },
      { home: 'LATIN BROTHER', away: 'TARZAN S23' },
      { home: 'JOLIMBOS', away: 'CALIFORNICIO' },
      { home: 'TUPESACOS', away: 'FIGURINES FC' },
    ],
  },
  {
    number: 4,
    date: '25-10-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'DEPORTIVO RESACON', isHome: true, home: 'LAS WINX', away: 'DEPORTIVO RESACON' },
    matches: [
      { home: 'FS CASARRUBUELOS', away: 'TUPESACOS' },
      { home: 'LAS WINX', away: 'DEPORTIVO RESACON' },
      { home: 'PLANE PLANET FC', away: 'BLUE DRAGON' },
      { home: 'TARZAN S23', away: 'PUNTOS VERANO CF' },
      { home: 'CALIFORNICIO', away: 'LATIN BROTHER' },
      { home: 'FIGURINES FC', away: 'JOLIMBOS' },
    ],
  },
  {
    number: 5,
    date: '08-11-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'FS CASARRUBUELOS', isHome: false, home: 'FS CASARRUBUELOS', away: 'LAS WINX' },
    matches: [
      { home: 'FS CASARRUBUELOS', away: 'LAS WINX' },
      { home: 'DEPORTIVO RESACON', away: 'PLANE PLANET FC' },
      { home: 'BLUE DRAGON', away: 'TARZAN S23' },
      { home: 'PUNTOS VERANO CF', away: 'CALIFORNICIO' },
      { home: 'LATIN BROTHER', away: 'FIGURINES FC' },
      { home: 'TUPESACOS', away: 'JOLIMBOS' },
    ],
  },
  {
    number: 6,
    date: '15-11-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'TUPESACOS', isHome: true, home: 'LAS WINX', away: 'TUPESACOS' },
    matches: [
      { home: 'LAS WINX', away: 'TUPESACOS' },
      { home: 'PLANE PLANET FC', away: 'FS CASARRUBUELOS' },
      { home: 'TARZAN S23', away: 'DEPORTIVO RESACON' },
      { home: 'CALIFORNICIO', away: 'BLUE DRAGON' },
      { home: 'FIGURINES FC', away: 'PUNTOS VERANO CF' },
      { home: 'JOLIMBOS', away: 'LATIN BROTHER' },
    ],
  },
  {
    number: 7,
    date: '22-11-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'PLANE PLANET FC', isHome: true, home: 'LAS WINX', away: 'PLANE PLANET FC' },
    matches: [
      { home: 'LAS WINX', away: 'PLANE PLANET FC' },
      { home: 'FS CASARRUBUELOS', away: 'TARZAN S23' },
      { home: 'DEPORTIVO RESACON', away: 'CALIFORNICIO' },
      { home: 'BLUE DRAGON', away: 'FIGURINES FC' },
      { home: 'PUNTOS VERANO CF', away: 'JOLIMBOS' },
      { home: 'TUPESACOS', away: 'LATIN BROTHER' },
    ],
  },
  {
    number: 8,
    date: '29-11-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'TARZAN S23', isHome: false, home: 'TARZAN S23', away: 'LAS WINX' },
    matches: [
      { home: 'PLANE PLANET FC', away: 'TUPESACOS' },
      { home: 'TARZAN S23', away: 'LAS WINX' },
      { home: 'CALIFORNICIO', away: 'FS CASARRUBUELOS' },
      { home: 'FIGURINES FC', away: 'DEPORTIVO RESACON' },
      { home: 'JOLIMBOS', away: 'BLUE DRAGON' },
      { home: 'LATIN BROTHER', away: 'PUNTOS VERANO CF' },
    ],
  },
  {
    number: 9,
    date: '13-12-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'CALIFORNICIO', isHome: true, home: 'LAS WINX', away: 'CALIFORNICIO' },
    matches: [
      { home: 'PLANE PLANET FC', away: 'TARZAN S23' },
      { home: 'LAS WINX', away: 'CALIFORNICIO' },
      { home: 'FS CASARRUBUELOS', away: 'FIGURINES FC' },
      { home: 'DEPORTIVO RESACON', away: 'JOLIMBOS' },
      { home: 'BLUE DRAGON', away: 'LATIN BROTHER' },
      { home: 'TUPESACOS', away: 'PUNTOS VERANO CF' },
    ],
  },
  {
    number: 10,
    date: '20-12-2026',
    round: 'Primera vuelta',
    winxMatch: { rival: 'FIGURINES FC', isHome: false, home: 'FIGURINES FC', away: 'LAS WINX' },
    matches: [
      { home: 'TUPESACOS', away: 'TARZAN S23' },
      { home: 'CALIFORNICIO', away: 'PLANE PLANET FC' },
      { home: 'FIGURINES FC', away: 'LAS WINX' },
      { home: 'JOLIMBOS', away: 'FS CASARRUBUELOS' },
      { home: 'LATIN BROTHER', away: 'DEPORTIVO RESACON' },
      { home: 'PUNTOS VERANO CF', away: 'BLUE DRAGON' },
    ],
  },
  {
    number: 11,
    date: '10-01-2027',
    round: 'Primera vuelta',
    winxMatch: { rival: 'JOLIMBOS', isHome: true, home: 'LAS WINX', away: 'JOLIMBOS' },
    matches: [
      { home: 'TARZAN S23', away: 'CALIFORNICIO' },
      { home: 'PLANE PLANET FC', away: 'FIGURINES FC' },
      { home: 'LAS WINX', away: 'JOLIMBOS' },
      { home: 'FS CASARRUBUELOS', away: 'LATIN BROTHER' },
      { home: 'DEPORTIVO RESACON', away: 'PUNTOS VERANO CF' },
      { home: 'BLUE DRAGON', away: 'TUPESACOS' },
    ],
  },

  // Segunda vuelta
  {
    number: 12,
    date: '17-01-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'LATIN BROTHER', isHome: true, home: 'LAS WINX', away: 'LATIN BROTHER' },
    matches: [
      { home: 'DEPORTIVO RESACON', away: 'BLUE DRAGON' },
      { home: 'FS CASARRUBUELOS', away: 'PUNTOS VERANO CF' },
      { home: 'LAS WINX', away: 'LATIN BROTHER' },
      { home: 'PLANE PLANET FC', away: 'JOLIMBOS' },
      { home: 'TARZAN S23', away: 'FIGURINES FC' },
      { home: 'CALIFORNICIO', away: 'TUPESACOS' },
    ],
  },
  {
    number: 13,
    date: '24-01-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'PUNTOS VERANO CF', isHome: false, home: 'PUNTOS VERANO CF', away: 'LAS WINX' },
    matches: [
      { home: 'TUPESACOS', away: 'DEPORTIVO RESACON' },
      { home: 'BLUE DRAGON', away: 'FS CASARRUBUELOS' },
      { home: 'PUNTOS VERANO CF', away: 'LAS WINX' },
      { home: 'LATIN BROTHER', away: 'PLANE PLANET FC' },
      { home: 'JOLIMBOS', away: 'TARZAN S23' },
      { home: 'FIGURINES FC', away: 'CALIFORNICIO' },
    ],
  },
  {
    number: 14,
    date: '31-01-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'BLUE DRAGON', isHome: true, home: 'LAS WINX', away: 'BLUE DRAGON' },
    matches: [
      { home: 'FS CASARRUBUELOS', away: 'DEPORTIVO RESACON' },
      { home: 'LAS WINX', away: 'BLUE DRAGON' },
      { home: 'PLANE PLANET FC', away: 'PUNTOS VERANO CF' },
      { home: 'TARZAN S23', away: 'LATIN BROTHER' },
      { home: 'CALIFORNICIO', away: 'JOLIMBOS' },
      { home: 'FIGURINES FC', away: 'TUPESACOS' },
    ],
  },
  {
    number: 15,
    date: '07-02-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'DEPORTIVO RESACON', isHome: false, home: 'DEPORTIVO RESACON', away: 'LAS WINX' },
    matches: [
      { home: 'TUPESACOS', away: 'FS CASARRUBUELOS' },
      { home: 'DEPORTIVO RESACON', away: 'LAS WINX' },
      { home: 'BLUE DRAGON', away: 'PLANE PLANET FC' },
      { home: 'PUNTOS VERANO CF', away: 'TARZAN S23' },
      { home: 'LATIN BROTHER', away: 'CALIFORNICIO' },
      { home: 'JOLIMBOS', away: 'FIGURINES FC' },
    ],
  },
  {
    number: 16,
    date: '14-02-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'FS CASARRUBUELOS', isHome: true, home: 'LAS WINX', away: 'FS CASARRUBUELOS' },
    matches: [
      { home: 'LAS WINX', away: 'FS CASARRUBUELOS' },
      { home: 'PLANE PLANET FC', away: 'DEPORTIVO RESACON' },
      { home: 'TARZAN S23', away: 'BLUE DRAGON' },
      { home: 'CALIFORNICIO', away: 'PUNTOS VERANO CF' },
      { home: 'FIGURINES FC', away: 'LATIN BROTHER' },
      { home: 'JOLIMBOS', away: 'TUPESACOS' },
    ],
  },
  {
    number: 17,
    date: '21-02-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'TUPESACOS', isHome: false, home: 'TUPESACOS', away: 'LAS WINX' },
    matches: [
      { home: 'TUPESACOS', away: 'LAS WINX' },
      { home: 'FS CASARRUBUELOS', away: 'PLANE PLANET FC' },
      { home: 'DEPORTIVO RESACON', away: 'TARZAN S23' },
      { home: 'BLUE DRAGON', away: 'CALIFORNICIO' },
      { home: 'PUNTOS VERANO CF', away: 'FIGURINES FC' },
      { home: 'LATIN BROTHER', away: 'JOLIMBOS' },
    ],
  },
  {
    number: 18,
    date: '28-02-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'PLANE PLANET FC', isHome: false, home: 'PLANE PLANET FC', away: 'LAS WINX' },
    matches: [
      { home: 'PLANE PLANET FC', away: 'LAS WINX' },
      { home: 'TARZAN S23', away: 'FS CASARRUBUELOS' },
      { home: 'CALIFORNICIO', away: 'DEPORTIVO RESACON' },
      { home: 'FIGURINES FC', away: 'BLUE DRAGON' },
      { home: 'JOLIMBOS', away: 'PUNTOS VERANO CF' },
      { home: 'LATIN BROTHER', away: 'TUPESACOS' },
    ],
  },
  {
    number: 19,
    date: '07-03-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'TARZAN S23', isHome: true, home: 'LAS WINX', away: 'TARZAN S23' },
    matches: [
      { home: 'TUPESACOS', away: 'PLANE PLANET FC' },
      { home: 'LAS WINX', away: 'TARZAN S23' },
      { home: 'FS CASARRUBUELOS', away: 'CALIFORNICIO' },
      { home: 'DEPORTIVO RESACON', away: 'FIGURINES FC' },
      { home: 'BLUE DRAGON', away: 'JOLIMBOS' },
      { home: 'PUNTOS VERANO CF', away: 'LATIN BROTHER' },
    ],
  },
  {
    number: 20,
    date: '14-03-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'CALIFORNICIO', isHome: false, home: 'CALIFORNICIO', away: 'LAS WINX' },
    matches: [
      { home: 'TARZAN S23', away: 'PLANE PLANET FC' },
      { home: 'CALIFORNICIO', away: 'LAS WINX' },
      { home: 'FIGURINES FC', away: 'FS CASARRUBUELOS' },
      { home: 'JOLIMBOS', away: 'DEPORTIVO RESACON' },
      { home: 'LATIN BROTHER', away: 'BLUE DRAGON' },
      { home: 'PUNTOS VERANO CF', away: 'TUPESACOS' },
    ],
  },
  {
    number: 21,
    date: '04-04-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'FIGURINES FC', isHome: true, home: 'LAS WINX', away: 'FIGURINES FC' },
    matches: [
      { home: 'TARZAN S23', away: 'TUPESACOS' },
      { home: 'PLANE PLANET FC', away: 'CALIFORNICIO' },
      { home: 'LAS WINX', away: 'FIGURINES FC' },
      { home: 'FS CASARRUBUELOS', away: 'JOLIMBOS' },
      { home: 'DEPORTIVO RESACON', away: 'LATIN BROTHER' },
      { home: 'BLUE DRAGON', away: 'PUNTOS VERANO CF' },
    ],
  },
  {
    number: 22,
    date: '11-04-2027',
    round: 'Segunda vuelta',
    winxMatch: { rival: 'JOLIMBOS', isHome: false, home: 'JOLIMBOS', away: 'LAS WINX' },
    matches: [
      { home: 'CALIFORNICIO', away: 'TARZAN S23' },
      { home: 'FIGURINES FC', away: 'PLANE PLANET FC' },
      { home: 'JOLIMBOS', away: 'LAS WINX' },
      { home: 'LATIN BROTHER', away: 'FS CASARRUBUELOS' },
      { home: 'PUNTOS VERANO CF', away: 'DEPORTIVO RESACON' },
      { home: 'TUPESACOS', away: 'BLUE DRAGON' },
    ],
  },
];
