"use client";

import { useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from "next/link";
import { Card } from "@/app/component/ui/card";
import { Input } from "@/app/component/ui/input";
import { useFavorites, FavoritesState } from '@/lib/stores/useFavorites';
import Image from "next/image";

type TypeItem = {
    name: string;
    url: string;
};

type TypePokemonDetail = {
    pokemon: { pokemon: { name: string; url: string } }[];
};

export default function TypesPage() {
    const artworkUrl = process.env.NEXT_PUBLIC_ARTWORK_URL || "";
    const [selected, setSelected] = useState<string | null>('normal');
    const [query, setQuery] = useState("");

    const typesQuery = useQuery<{ results: TypeItem[] }, Error>({
        queryKey: ['types'],
        queryFn: async () => {
            const res = await api.get('/type');
            return res.data as { results: TypeItem[] };
        },
    });

    const typeQuery = useQuery<TypePokemonDetail, Error>({
        queryKey: ['type', selected],
        queryFn: async () => {
            if (!selected) throw new Error('no type');
            const res = await api.get(`/type/${selected}`);
            return res.data;
        },
        enabled: !!selected,
    });
    const favorites = useFavorites((s: FavoritesState) => s.favorites);
    const toggleFavorite = useFavorites((s: FavoritesState) => s.toggle);

    const types = typesQuery.data?.results ?? [];
    const typePokemon = typeQuery.data ?? null;
    const loading = typesQuery.isLoading || typeQuery.isLoading;

    const filteredTypePokemon = useMemo(() => {
        if (!typePokemon) return null;
        if (!query) return typePokemon;
        const filtered = typePokemon.pokemon.filter((p) =>
            p.pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        return { pokemon: filtered } as TypePokemonDetail;
    }, [query, typePokemon]);

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Types Explorer</h1>
            <div className="flex gap-4">
                <div className="w-48">
                    <h2 className="font-semibold mb-2">All Types</h2>
                    <ul className="space-y-1 bg-slate-200 rounded-md p-2">
                        {types.map((t) => (
                            <li key={t.name}>
                                <button onClick={() => setSelected(t.name)} className={`capitalize text-left w-full cursor-pointer p-2 hover:bg-slate-300 rounded ${selected === t.name ? 'bg-slate-300 font-semibold' : ''}`}>{t.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1">
                    <h2 className="font-semibold mb-2">Pokémon for: <span className="capitalize">{selected || '—'}</span></h2>
                    {loading && <p>Loading...</p>}
                    {!loading && typePokemon && (
                        <>
                            <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" className="mb-3" />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {filteredTypePokemon?.pokemon.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No Pokémon found for this type.</p>
                                ) : (
                                    filteredTypePokemon?.pokemon.map((pItem) => {
                                        const p = pItem.pokemon;
                                        const id = p.url.split('/').filter(Boolean).pop();
                                        const img = id ? `${artworkUrl}/${id}.png` : undefined;
                                        const inTeam = favorites.includes(p.name);
                                        return (
                                            <Card key={p.name} className={`capitalize bg-white/60 p-2 rounded ${inTeam ? 'border-2 border-emerald-500' : 'saturate-0'}`}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-12 shrink-0">
                                                        {img ? (
                                                            <Image src={img} alt={p.name} width={48} height={48} className="mx-auto" />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-100" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link href={`/pokedex/dex/${p.name}`} className="block font-medium">{p.name}</Link>
                                                        <div className="text-sm text-slate-600">{inTeam ? <span className="text-emerald-600 font-semibold">In Team</span> : <span className="text-slate-500">Not in team</span>}</div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => toggleFavorite(p.name)} className="px-2 py-1 rounded bg-slate-200 cursor-pointer hover:bg-slate-300">{inTeam ? 'Remove' : 'Add'}</button>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
