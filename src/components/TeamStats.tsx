import React from 'react';
import { OFFICIAL_SQUAD, TeamPlayer } from '../data/teamData';
import { Trophy } from 'lucide-react';

const sortPlayers = (players: TeamPlayer[]) => {
	return [...players].sort((a, b) => {
		const goalsA = a.goals ?? 0;
		const goalsB = b.goals ?? 0;
		if (goalsB !== goalsA) return goalsB - goalsA;
		const assistsA = a.assists ?? 0;
		const assistsB = b.assists ?? 0;
		return assistsB - assistsA;
	});
};

export const TeamStats: React.FC = () => {
	const players = sortPlayers(OFFICIAL_SQUAD);
	const top = players[0];
	const totalGoals = OFFICIAL_SQUAD.reduce((s, p) => s + (p.goals ?? 0), 0);
	const totalAssists = OFFICIAL_SQUAD.reduce((s, p) => s + (p.assists ?? 0), 0);

	const maxGoals = Math.max(...OFFICIAL_SQUAD.map((p) => p.goals ?? 0), 1);

	const getAvatar = (p: TeamPlayer) => {
		if (p.photo) return (
			<img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
		);
		return (
			<div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-pink-300 font-extrabold">
				{p.name.charAt(0).toUpperCase()}
			</div>
		);
	};

	return (
		<div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
			<div className="flex items-start justify-between mb-4">
				<div>
					<span className="text-xs font-bold uppercase tracking-widest text-pink-400">Goles</span>
					<h2 className="text-2xl font-black text-white">Goles y Estadísticas</h2>
				</div>

				<div className="text-right">
					<div className="text-sm text-neutral-300">Totales</div>
					<div className="font-extrabold text-white text-lg">{totalGoals} Goles • {totalAssists} Asistencias</div>
				</div>
			</div>

			<div className="mb-6">
				{totalGoals === 0 ? (
					<div className="text-sm text-neutral-400">Aún no hay goles registrados.</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{players.slice(0, 3).map((p, idx) => (
								<div key={p.id} className={`p-3 rounded-xl border ${idx === 0 ? 'bg-pink-500/10 border-pink-500' : 'bg-neutral-950/60 border-neutral-800'}`}>
									<div className="flex items-center gap-3">
										{getAvatar(p)}
										<div>
											<div className="text-xs text-neutral-300">{idx === 0 ? 'Pichichi' : idx === 1 ? '2º' : '3º'}</div>
											<div className="font-black text-white">{p.name}</div>
												<div className="text-[12px] text-neutral-400">{p.goals ?? 0} G · {p.assists ?? 0} A</div>
										</div>
									</div>
								
								</div>
							))}
						</div>
					</>
				)}
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="text-xs text-neutral-400 uppercase">
						<tr>
							<th className="px-2 py-2 align-middle w-10 text-center">#</th>
							<th className="px-2 py-2 align-middle">Jugador</th>
							<th className="px-2 py-2 align-middle w-12 text-center">G</th>
							<th className="px-2 py-2 align-middle w-12 text-center">A</th>
							<th className="px-2 py-2 align-middle w-12 text-center">PJ</th>
							<th className="px-2 py-2 align-middle w-12 text-center">TA</th>
							<th className="px-2 py-2 align-middle w-12 text-center">TR</th>
						</tr>
					</thead>
					<tbody>
						{players.map((p) => (
							<tr key={p.id} className="border-t border-neutral-800 hover:bg-neutral-950/40 transition-colors">
								<td className="px-2 py-3 font-bold align-middle w-10 text-center">{p.number}</td>
								<td className="px-2 py-3 flex items-center gap-3 align-middle min-w-0">
									{getAvatar(p)}
									<div className="truncate">
										<div className="font-bold truncate">{p.name}</div>
									</div>
								</td>
								<td className="px-2 py-3 font-extrabold w-12 text-center align-middle">{p.goals ?? 0}</td>
								<td className="px-2 py-3 w-12 text-center align-middle">{p.assists ?? 0}</td>
								<td className="px-2 py-3 w-12 text-center align-middle">{p.matchesPlayed ?? 0}</td>
								<td className="px-2 py-3 w-12 text-center align-middle">{p.yellowCards ?? 0}</td>
								<td className="px-2 py-3 w-12 text-center align-middle">{p.redCards ?? 0}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
