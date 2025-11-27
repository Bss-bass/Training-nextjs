"use client";
import { useQueries } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from "next/link";
import { useFavorites, FavoritesState } from '@/lib/stores/useFavorites';
import { Card } from "@/app/component/ui/card";
import Image from "next/image";

type MiniPokemon = {
    id: number;
    name: string;
    sprites: { front_default: string | null };
    types: { slot: number; type: { name: string } }[];
};

export default function TeamPage() {

    const favNames = useFavorites((s: FavoritesState) => s.favorites);
    const removeFromStore = useFavorites((s: FavoritesState) => s.remove);

    const queries = useQueries({
        queries: favNames.map((name: string) => ({
            queryKey: ['pokemon', name],
            queryFn: async () => {
                const res = await api.get(`/pokemon/${name}`);
                return res.data as MiniPokemon;
            },
            enabled: !!name,
        })),
    });

    const favorites = queries.map((q) => q.data).filter(Boolean) as MiniPokemon[];
    const loading = queries.some((q) => q.isLoading);

    function remove(name: string) {
        removeFromStore(name);
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Team / Favorites</h1>

            {loading ? (
                <p>Loading favorites...</p>
            ) : favorites.length === 0 ? (
                <p>No favorites yet. Add some from a Pokémon detail page.</p>
            ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {favorites.map((f) => (
                        <li key={f.name}>
                            <Card className="p-6">
                                <Link href={`/pokedex/dex/${f.name}`} className="capitalize block">
                                    <span className="text-lg font-medium text-center block">{f.name}</span>

                                    {f.sprites.front_default && (
                                        <Image src={f.sprites.front_default} alt={f.name} width={96} height={96} className="mx-auto" />
                                    )}

                                    <div className="text-sm text-slate-600 mt-2 text-center">{f.types.map((t) => t.type.name).join(', ')}</div>
                                </Link>

                                <button
                                    onClick={() => remove(f.name)}
                                    className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Remove
                                </button>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
