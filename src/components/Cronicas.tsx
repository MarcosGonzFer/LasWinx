import React, { useState } from 'react';
import { CRONICAS, Cronica } from '../data/cronicas';

const formatHeader = (c: Cronica) => `${c.date} · Jornada ${c.jornadaNumber}`;

const Modal: React.FC<{open: boolean; onClose: () => void; cr: Cronica | null}> = ({ open, onClose, cr }) => {
  if (!open || !cr) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full p-6 z-10 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-400">{formatHeader(cr)} · {cr.isHome ? 'Local' : 'Visitante'}</div>
            <h3 className="text-2xl font-extrabold text-white mt-1">{cr.title}</h3>
            <div className="text-sm text-pink-400 font-bold mt-1">Resultado: {cr.score} · Rival: {cr.opponent}</div>
          </div>

          <div>
            <button onClick={onClose} className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300">Cerrar</button>
          </div>
        </div>

        <div className="mt-4 text-sm text-neutral-200 whitespace-pre-line">{cr.text}</div>

        {cr.highlights && (
          <div className="mt-4">
            <h4 className="text-sm text-neutral-300 font-bold">Destacados</h4>
            <ul className="mt-2 list-disc list-inside text-neutral-300">
              {cr.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export const Cronicas: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCronica, setActiveCronica] = useState<Cronica | null>(null);

  const openModal = (c: Cronica) => {
    setActiveCronica(c);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveCronica(null);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Crónicas</span>
          <h2 className="text-3xl font-extrabold text-white">Crónicas de la temporada</h2>
          <p className="text-sm text-neutral-400 mt-1">Pulsa en cualquier crónica para ver el informe completo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CRONICAS.length === 0 && (
          <div className="col-span-full text-sm text-neutral-400">Aún no hay crónicas publicadas.</div>
        )}

        {CRONICAS.map((c) => (
          <div key={c.id} className="relative bg-neutral-950/40 border border-neutral-800 rounded-2xl p-6 hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white">{c.title}</h3>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xs text-neutral-400">Goles</div>
                  <div className="font-black text-white text-xl">{c.score}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-neutral-400">{formatHeader(c)}</div>
              <button onClick={() => openModal(c)} className="px-3 py-1.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm">Leer más</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={closeModal} cr={activeCronica} />
    </div>
  );
};
