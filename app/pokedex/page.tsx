"use client";

import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from "next/image";
import { Button } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useExamplesQuery } from './hooks/usePokemon';

export default function Page() {
    const examplesQuery = useExamplesQuery(3);

    const examples = examplesQuery.data ?? null;
    const loading = examplesQuery.isLoading;
    const error = examplesQuery.error ? (examplesQuery.error as Error).message : null;


    return (
        <main className="min-h-screen p-8 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <section className="flex flex-col items-center gap-6 mb-8">
                    <Card className="p-6">
                        <CardContent>
                            <h1 className="text-4xl font-extrabold mb-3">Pokedex — Explore Pokémon</h1>
                            <p className="text-lg text-slate-700 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nostrum eius voluptate voluptates, dolore laudantium cumque sunt quis rem ad soluta, dicta ratione? Dignissimos amet ducimus necessitatibus exercitationem sequi incidunt!</p>
                            <div className="flex gap-3">
                                <Button variant='contained' color="primary">
                                    <Link href="/pokedex/dex">Open Pokédex</Link>
                                </Button>
                                <Button variant='contained' color="secondary">
                                    <Link href="/pokedex/types">Explore Types</Link>
                                </Button>
                                <Button variant='contained' color="success">
                                    <Link href="/pokedex/team">My Team</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-full md:w-1/2 p-6">
                        <CardContent>
                            <h3 className="font-semibold mb-2">Random Pokémon</h3>
                            {loading && <p>Loading examples...</p>}
                            {error && <p className="text-red-600">Error: {error}</p>}

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {examples?.map((p) => (
                                    <article key={p.id} className="bg-white p-3 rounded text-center">
                                        {p.sprites.front_default ? (
                                            <Image src={p.sprites.front_default} alt={p.name} width={96} height={96} className="mx-auto mb-2" />
                                        ) : (
                                            <div className="w-24 h-24 bg-gray-100 mb-2 mx-auto" />
                                        )}
                                        <div className="capitalize font-medium">{p.name}</div>
                                        <div className="text-sm text-slate-600 mt-1 mb-2">{p.types.map((t) => t.type.name).join(', ')}</div>
                                        <Button variant='outlined' color="info">
                                            <Link href={`/pokedex/dex/${p.id}`}>View</Link>
                                        </Button>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-3 flex justify-end">
                                <Button onClick={() => examplesQuery.refetch()} variant="contained" endIcon={<ShuffleIcon />}>Shuffle</Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}