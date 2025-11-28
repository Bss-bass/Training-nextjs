"use client";

import Link from "next/link";
import { Card } from '@/app/component/ui/card';
import Image from "next/image";
import { Button } from '@/app/component/ui/button';
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
                            <h1 className="text-4xl font-extrabold mb-3">Pokedex — Explore Pokémon</h1>
                            <p className="text-lg text-slate-700 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nostrum eius voluptate voluptates, dolore laudantium cumque sunt quis rem ad soluta, dicta ratione? Dignissimos amet ducimus necessitatibus exercitationem sequi incidunt!</p>
                            <div className="flex gap-3">
                                <Button className="bg-red-500 hover:bg-red-600">
                                    <Link href="/pokedex/dex">Open Pokédex</Link>
                                </Button>
                                <Button className="bg-blue-500 hover:bg-blue-600">
                                    <Link href="/pokedex/types">Explore Types</Link>
                                </Button>
                                <Button className="bg-green-500 hover:bg-green-600">
                                    <Link href="/pokedex/team">My Team</Link>
                                </Button>
                            </div>
                    </Card>

                    <Card className="w-full md:w-1/2 p-6">
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
                                        <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                                            <Link href={`/pokedex/dex/${p.id}`}>View</Link>
                                        </Button>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-3 flex justify-end">
                                <Button onClick={() => examplesQuery.refetch()}>Shuffle</Button>
                            </div>
                    </Card>
                </section>
            </div>
        </main>
    );
}