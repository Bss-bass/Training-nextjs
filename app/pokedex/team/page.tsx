"use client";
import { useQueries } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from "next/link";
import { useFavorites } from '@/lib/context/FavoritesContext';
import { Card, Button } from "@mui/material";
import Image from "next/image";

type MiniPokemon = {
    id: number;
    name: string;
    sprites: { front_default: string | null };
    types: { slot: number; type: { name: string } }[];
};

export default function TeamPage() {

    const { favorites: favIds, remove } = useFavorites();

    const queries = useQueries({
        queries: favIds.map((id: number) => ({
            queryKey: ['pokemon', id],
            queryFn: async () => {
                const res = await api.get(`/pokemon/${id}`);
                return res.data as MiniPokemon;
            },
            enabled: !!id,
        })),
    });

    const favorites = queries.map((q) => q.data).filter(Boolean) as MiniPokemon[];
    const loading = queries.some((q) => q.isLoading);

    function removeId(id: number) {
        remove(id);
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
                            <Card className="p-6 flex flex-col items-center gap-4">
                                <Link href={`/pokedex/dex/${f.name}`} className="capitalize block hover:underline">
                                    <span className="text-lg font-medium text-center block">{f.name}</span>

                                    {f.sprites.front_default && (
                                        <Image src={f.sprites.front_default} alt={f.name} width={96} height={96} className="mx-auto" />
                                    )}

                                    <div className="text-sm text-slate-600 mt-2 text-center">{f.types.map((t) => t.type.name).join(', ')}</div>
                                </Link>

                                <Button
                                    onClick={() => removeId(f.id)}
                                    variant="contained"
                                    color='error'
                                >
                                    Remove
                                </Button>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
