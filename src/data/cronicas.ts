export interface Cronica {
  id: string;
  jornadaNumber: number;
  date: string; // human readable
  opponent: string;
  isHome: boolean;
  score: string; // e.g. "3-1"
  title?: string;
  text: string; // full match report
  highlights?: string[]; // short bullets
  image?: string; // optional image path
}

export const CRONICAS: Cronica[] = [
  {
    id: 'c1',
    jornadaNumber: 1,
    date: '26-09-2026',
    opponent: 'LATIN BROTHER',
    isHome: false,
    score: '7-5',
    title: 'Debut amargo en casa rival',
    text: `Debutamos en la liga con un partido intenso y lleno de alternativas. A pesar de la entrega y los goles del equipo (varias acciones bien construidas y coraje hasta el final), no pudimos cerrar la defensa y el rival aprovechó errores puntuales para marcharse en el marcador. El resultado final fue 7-5 a favor de Latin Brother.

El equipo mostró carácter y creación de juego, con momentos muy buenos en ataque; sin embargo, la fragilidad defensiva en fases del segundo tiempo nos pasó factura. Hay buenos apuntes para mejorar: repliegue tras pérdida, contención de transiciones y mayor concentración en las jugadas a balón parado.`,
    highlights: ['Partido con muchas alternativas', 'Buen carácter ofensivo del equipo', 'Fallas defensivas en el segundo tiempo'],
  },
];
