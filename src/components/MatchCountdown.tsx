import React, { useState, useEffect } from 'react';
import { Clock, Calendar, MapPin, Sparkles } from 'lucide-react';

interface CountdownProps {
  targetDateStr?: string; // default to '2026-09-27T10:00:00'
}

export const MatchCountdown: React.FC<CountdownProps> = ({ 
  targetDateStr = '2026-09-27T10:00:00' 
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-pink-950/40 border border-pink-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
              JORNADA 1 • EL DEBUT
            </span>
            <span className="text-xs text-neutral-400 font-medium">Liga Getafe 2026/27</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Montserrat'] tracking-tight">
            LATIN BROTHER vs <span className="text-pink-400">LAS WINX FC</span>
          </h3>
          <p className="text-xs text-neutral-400 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            <span>Domingo 27 de Septiembre, 2026</span>
            <span>•</span>
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span>Pabellón Municipal Getafe</span>
          </p>
        </div>

        {/* Cajas de Cuenta Atrás */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center shrink-0">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-2.5 sm:px-3 sm:py-2 min-w-[60px] sm:min-w-[68px]">
            <span className="block text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
              {timeLeft.days}
            </span>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Días</span>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-2.5 sm:px-3 sm:py-2 min-w-[60px] sm:min-w-[68px]">
            <span className="block text-2xl sm:text-3xl font-black text-pink-400 font-['Montserrat']">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Horas</span>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-2.5 sm:px-3 sm:py-2 min-w-[60px] sm:min-w-[68px]">
            <span className="block text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Min</span>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-2.5 sm:px-3 sm:py-2 min-w-[60px] sm:min-w-[68px]">
            <span className="block text-2xl sm:text-3xl font-black text-pink-400 font-['Montserrat']">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Seg</span>
          </div>
        </div>
      </div>
    </div>
  );
};
