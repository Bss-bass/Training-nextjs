"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from "next/link";
import { Input } from "@/app/component/ui/input";
import { useFavorites, FavoritesState } from '@/lib/stores/useFavorites';
import Image from "next/image";

type ListResult = {
    name: string;
    url: string;
};

export default function Page() {
    const artworkUrl = process.env.NEXT_PUBLIC_ARTWORK_URL || "";
    const [page, setPage] = useState(0);
    const [limit] = useState(20);
    const [query, setQuery] = useState("");

    const listQuery = useQuery<{ count: number; results: ListResult[] }, Error>({
        queryKey: ['pokemon-list', page, limit],
        queryFn: async () => {
            const offset = page * limit;
            const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
            return res.data as { count: number; results: ListResult[] };
        },
    });

    const loading = listQuery.isLoading;
    const itemsData = useMemo(() => listQuery.data?.results ?? [], [listQuery.data]);
    const totalCount = listQuery.data?.count ?? 0;

    const filtered = useMemo(() => {
        if (!query) return itemsData;
        return itemsData.filter((i: ListResult) => i.name.toLowerCase().includes(query.toLowerCase()));
    }, [itemsData, query]);

    const nextPage = useCallback(() => {
        setPage((s) => {
            const maxPage = Math.floor(totalCount / limit);
            if (s + 1 > maxPage) return s;
            return s + 1;
        });
    }, [totalCount, limit]);

    const prevPage = useCallback(() => {
        setPage((s) => Math.max(0, s - 1));
    }, []);

    const getIdFromUrl = (url: string) => {
        try {
            const parts = url.split('/').filter(Boolean);
            return parts[parts.length - 1];
        } catch {
            return undefined;
        }
    };

    const favorites = useFavorites((s: FavoritesState) => s.favorites);
    const toggleFavorite = useFavorites((s: FavoritesState) => s.toggle);

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
            <div className="mb-4 flex gap-2">
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" />
                <Link href="/pokedex/types" className="px-3 py-2 rounded bg-sky-500 text-white">Types</Link>
                <Link href="/pokedex/team" className="px-3 py-2 rounded bg-emerald-500 text-white">Team</Link>
            </div>
            <p className="mb-2">Total Pokémon: {totalCount}</p>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p className="mb-2 text-gray-500">Found {filtered.length} Pokémon</p>
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {filtered.map((p) => {
                            const id = getIdFromUrl(p.url);
                            const img = id ? `${artworkUrl}/${id}.png` : undefined;
                            const inTeam = favorites.includes(p.name);
                            return (
                                <li key={p.name} className={`bg-white/60 p-3 rounded shadow flex items-center gap-3 ${favorites.includes(p.name) ? 'border-2 border-emerald-500' : 'saturate-0'}`}>
                                    <div className="w-16 h-16 shrink-0">
                                        {img ? (
                                            <Image src={img} alt={p.name} width={64} height={64} className="mx-auto" />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Link href={`/pokedex/dex/${p.name}`} className="capitalize font-medium block">{p.name}</Link>
                                        <div className="text-sm text-gray-500 mt-1">{inTeam ? <span className="text-emerald-600 font-semibold">In Team</span> : <span className="text-slate-500">Not in team</span>}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => toggleFavorite(p.name)} className="px-2 py-1 rounded bg-slate-200 cursor-pointer hover:bg-slate-300">{inTeam ? 'Remove' : 'Add'}</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}

            <div className="flex gap-2 mt-6 justify-center">
                <button onClick={prevPage} className="px-3 py-1 bg-slate-200 rounded cursor-pointer hover:bg-slate-300">Prev</button>
                <span className="px-3 py-1">Page {page + 1}</span>
                <button onClick={nextPage} className="px-3 py-1 bg-slate-200 rounded cursor-pointer hover:bg-slate-300">Next</button>
            </div>
        </div>
    );
}