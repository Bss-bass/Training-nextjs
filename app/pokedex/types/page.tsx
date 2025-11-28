"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useFavorites, FavoritesState } from '@/lib/stores/useFavorites';
import Image from "next/image";
import { Button } from '@/app/component/ui/button';
import { Input } from '@/app/component/ui/input';
import { Card } from '@/app/component/ui/card';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/component/ui/select";
import { useTypesList, useTypeDetail } from "../hooks/usePokemon";
import type { TypePokemonDetail } from "../hooks/usePokemon";

export default function TypesPage() {
    const artworkUrl = process.env.NEXT_PUBLIC_ARTWORK_URL || "";
    const [selected, setSelected] = useState<string | null>('normal');
    const [query, setQuery] = useState("");

    const typesQuery = useTypesList();

    const typeQuery = useTypeDetail(selected);

    const favorites = useFavorites((s: FavoritesState) => s.favorites);
    const toggle = useFavorites((s: FavoritesState) => s.toggle);

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

    const getIdFromUrl = (url: string) => {
        const parts = url.split('/').filter(Boolean);
        return parts[parts.length - 1];
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Types Explorer</h1>
            <div className="flex gap-4">
                <div className="w-48">
                    <h2 className="font-semibold mb-2">All Types</h2>
                    <Select value={selected || undefined} onValueChange={(v) => setSelected(v)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                                {types.map((t) => (
                                    <SelectItem key={t.name} value={t.name} className="capitalize">{t.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1">
                    <h2 className="font-semibold mb-2">Pokémon for: <span className="capitalize">{selected || '—'}</span></h2>
                    {loading && <p>Loading...</p>}
                    {!loading && typePokemon && (
                        <>
                            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" className="max-w-[400px] min-h-[60px]" />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                                {filteredTypePokemon?.pokemon.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No Pokémon found for this type.</p>
                                ) : (
                                    filteredTypePokemon?.pokemon.map((pItem) => {
                                        const p = pItem.pokemon;
                                        const id = getIdFromUrl(p.url);
                                        const numericId = id ? Number(id) : undefined;
                                        const img = numericId ? `${artworkUrl}/${numericId}.png` : undefined;
                                        const inTeam = numericId ? favorites.includes(numericId) : false;
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
                                                        <Link href={`/pokedex/dex/${numericId}`} className="block font-medium hover:underline">{p.name}</Link>
                                                        <div className="text-sm text-slate-600">{inTeam ? <span className="text-emerald-600 font-semibold">In Team</span> : <span className="text-slate-500">Not in team</span>}</div>
                                                    </div>
                                                    <div>
                                                        <Button onClick={() => numericId && toggle(numericId)} variant="outline" className="border-blue-500 text-blue-600">{inTeam ? 'Remove' : 'Add'}</Button>
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
