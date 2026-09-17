export type PlayerPosition = 'Portero' | 'Cierre' | 'Ala' | 'Pívot' | 'Entrenador';

export interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  yellowCards: number;
  mvpCount: number;
  pace: number;       // 0-99
  shooting: number;   // 0-99
  passing: number;    // 0-99
  dribbling: number;  // 0-99
  defense: number;    // 0-99
  physical: number;   // 0-99
}

export interface Player {
  id: string;
  dorsal: number;
  name: string;
  nickname: string;
  position: PlayerPosition;
  dominantFoot: 'Diestro' | 'Zurdo' | 'Ambidiestro';
  specialPower: string; // "Poder Winx"
  bio: string;
  stats: PlayerStats;
  avatarColor?: string;
  photoUrl?: string;
}

export interface Match {
  id: string;
  jornada: number;
  date: string;
  time: string;
  pavilion: string;
  city: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isCompleted: boolean;
  scorers?: string[];
  notes?: string;
}

export interface LeagueStanding {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  isOurTeam?: boolean;
  form: ('W' | 'D' | 'L')[];
}

export interface FanPrediction {
  id: string;
  name: string;
  homeScore: number;
  awayScore: number;
  message: string;
  timestamp: string;
}
