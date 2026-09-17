import confetti from 'canvas-confetti';

export const triggerWinxConfetti = () => {
  // Pink and white celebration confetti
  const colors = ['#ec4899', '#f472b6', '#ffffff', '#fb7185', '#fda4af'];
  
  // Center burst
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.6 },
    colors: colors,
    disableForReducedMotion: true,
  });

  // Left burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors: colors,
    });
  }, 150);

  // Right burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors: colors,
    });
  }, 300);
};
