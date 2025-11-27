"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Button, TextField, Card } from "@mui/material";
import { useFavorites } from '@/lib/context/FavoritesContext';
import Image from "next/image";
import { usePokemonList } from "../hooks/usePokemon";

type ListResult = {
    name: string;
    url: string;
};

export default function Page() {
    const artworkUrl = process.env.NEXT_PUBLIC_ARTWORK_URL || "";
    const [page, setPage] = useState(0);
    const [limit] = useState(20);
    const [query, setQuery] = useState("");

    const listQuery = usePokemonList(page, limit);

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

    const { favorites, toggle } = useFavorites();

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
            <div className="mb-4 flex items-center justify-between">
                <TextField id="outlined-basic" label="Search by name" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} sx={{ minWidth: 400 }} />
                <div className="flex gap-2">
                    <Button variant="contained" color="secondary">
                        <Link href="/pokedex/types">Types</Link>
                    </Button>
                    <Button variant="contained" color="success">
                        <Link href="/pokedex/team">Team</Link>
                    </Button>
                </div>
            </div>
            <p className="mb-2 flex justify-end">Total Pokémon: {totalCount}</p>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p className="mb-2 text-gray-500">Found {filtered.length} Pokémon</p>
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {filtered.map((p) => {
                            const id = getIdFromUrl(p.url);
                            const numericId = id ? Number(id) : undefined;
                            const img = numericId ? `${artworkUrl}/${numericId}.png` : undefined;
                            const inTeam = numericId ? favorites.includes(numericId) : false;
                            return (
                                <Card key={p.name} className={`bg-white/60 p-3 rounded shadow flex items-center gap-3 ${inTeam ? 'border-2 border-emerald-500' : 'saturate-0'}`}>
                                    <div className="w-16 h-16 shrink-0">
                                        {img ? (
                                            <Image src={img} alt={p.name} width={64} height={64} className="mx-auto" />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Link href={`/pokedex/dex/${getIdFromUrl(p.url)}`} className="capitalize font-medium block hover:underline">{p.name}</Link>
                                        <div className="text-sm text-gray-500 mt-1">{inTeam ? <span className="text-emerald-600 font-semibold">In Team</span> : <span className="text-slate-500">Not in team</span>}</div>
                                    </div>
                                    <div>
                                        <Button onClick={() => numericId && toggle(numericId)} variant="outlined">{inTeam ? 'Remove' : 'Add'}</Button>
                                    </div>
                                </Card>
                            );
                        })}
                    </ul>
                </>
            )}

            <div className="flex gap-2 mt-6 justify-center">
                <Button onClick={prevPage} variant="contained">Prev</Button>
                <span className="px-3 py-1">Page {page + 1}</span>
                <Button onClick={nextPage} variant="contained">Next</Button>
            </div>
        </div>
    );
}