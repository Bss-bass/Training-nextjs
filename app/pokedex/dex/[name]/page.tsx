"use client";

import { useParams } from "next/navigation";
import { useCallback } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import { useFavorites, FavoritesState } from '@/lib/stores/useFavorites';
import Image from "next/image";

export default function DetailPokemonPage() {
    const params = useParams<{ name: string }>();
    const name = params.name;

    const { data: pokemonData, loading, error, refetch, displayName } = usePokemon(name);

    const handleRefetch = useCallback(() => {
        refetch();
    }, [refetch]);

    const favorites = useFavorites((s: FavoritesState) => s.favorites);
    const toggleFavorite = useFavorites((s: FavoritesState) => s.toggle);
    const isFav = name ? favorites.includes(name) : false;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
            <div className="w-full max-w-3xl bg-white/60 dark:bg-slate-900/60 rounded-lg p-6 shadow">
                {loading && <p className="text-lg">Loading...</p>}
                {error && (
                    <div className="text-red-600">
                        <p>Error: {String(error.message)}</p>
                        <button onClick={handleRefetch} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">Retry</button>
                    </div>
                )}

                {pokemonData && (
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl font-bold capitalize">{displayName}</h1>
                            <button onClick={() => name && toggleFavorite(name)} className="ml-4 px-3 py-1 rounded bg-rose-500 text-white">
                                {isFav ? 'Remove from Team' : 'Add to Team'}
                            </button>
                        </div>

                        {pokemonData.sprites.front_default ? (
                            <Image src={pokemonData.sprites.front_default} alt={displayName} width={200} height={200} className="mb-4" />
                        ) : (
                            <div className="w-48 h-48 bg-gray-100 mb-4 flex items-center justify-center">No image</div>
                        )}

                        <div className="flex gap-4 mb-4">
                            <p className="text-lg">Height: {pokemonData.height}</p>
                            <p className="text-lg">Weight: {pokemonData.weight}</p>
                            <p className="text-lg">Base XP: {pokemonData.base_experience}</p>
                        </div>

                        <div className="w-full">
                            <h2 className="text-2xl font-semibold mt-4 mb-2">Types</h2>
                            <div className="flex gap-2">
                                {pokemonData.types.map((t: { type: { name: string } }) => (
                                    <span key={t.type.name} className="capitalize px-2 py-1 rounded bg-slate-200">{t.type.name}</span>
                                ))}
                            </div>

                            <h2 className="text-2xl font-semibold mt-4 mb-2">Abilities</h2>
                            <ul className="list-disc pl-6">
                                {pokemonData.abilities.map((abilityInfo: { ability: { name: string }; is_hidden: boolean }, index: number) => (
                                    <li key={index} className="text-lg capitalize">{abilityInfo.ability.name}{abilityInfo.is_hidden ? ' (hidden)' : ''}</li>
                                ))}
                            </ul>

                            <h2 className="text-2xl font-semibold mt-4 mb-2">Stats</h2>
                            <ul className="pl-0 grid grid-cols-2 gap-2">
                                {pokemonData.stats.map((s: { stat: { name: string }; base_stat: number }) => (
                                    <li key={s.stat.name} className="capitalize flex justify-between bg-slate-50 p-2 rounded">
                                        <span>{s.stat.name}</span>
                                        <span className="font-bold">{s.base_stat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}