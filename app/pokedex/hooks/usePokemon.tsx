"use client";

import { useMemo } from "react";
import { useQuery, useQueries } from '@tanstack/react-query';
import api from '@/lib/api';

type Pokemon = {
    name: string;
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
    base_experience: number;
    cries?: {
        latest: string;
        legacy: string;
    }
    forms: Array<{
        name: string;
        url: string;
    }>;
    game_indices: Array<{
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }>;
    height: number;
    held_items: Array<{
        item: {
            name: string;
            url: string;
        };
        version_details: Array<{
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }>;
    }>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<{
        move: {
            name: string;
            url: string;
        };
        version_group_details: Array<{
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            version_group: {
                name: string;
                url: string;
            };
        }>;
    }>;
    past_abilities?: Array<{
        abilities: Array<{
            ability: {
                name: string;
                url: string;
            };
            is_hidden: boolean;
            slot: number;
        }>;
        generation: {
            name: string;
            url: string;
        };
    }>;
    past_types?: Array<{
        generation: {
            name: string;
            url: string;
        };
        types: Array<{
            slot: number;
            type: {
                name: string;
                url: string;
            };
        }>;
    }>;
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        other?: {
            dream_world?: {
                front_default: string | null;
            };
        };
    };
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }>;
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
    weight: number;
};

type MiniPokemon = {
    id: number;
    name: string;
    sprites: { front_default: string | null };
    types: { slot: number; type: { name: string } }[];
};

type TypeItem = {
    name: string;
    url: string;
};

type TypePokemonDetail = {
    pokemon: { pokemon: { name: string; url: string } }[];
};

export function usePokemon(id?: string | null) {
    const query = useQuery<Pokemon, Error>({
        queryKey: ['pokemon', id],
        queryFn: async () => {
            if (!id) throw new Error('No id');
            const res = await api.get(`/pokemon/${id}`);
            return res.data as Pokemon;
        },
        enabled: !!id,
    });

    const displayName = useMemo(() => {
        return query.data?.species?.name ?? id ?? '';
    }, [query.data, id]);

    return {
        data: query.data ?? null,
        loading: query.isLoading,
        error: query.error as Error | null,
        refetch: query.refetch,
        displayName,
    } as const;
}

function randomIds(count: number, max = 1025) {
    const set = new Set<number>();
    while (set.size < count) {
        const id = Math.floor(Math.random() * max) + 1;
        set.add(id);
    }
    return Array.from(set);
}

export function useExamplesQuery(numberOfExamples: number) {
    return useQuery<Pokemon[], Error>({
        queryKey: ['pokemon-examples', numberOfExamples],
        queryFn: async () => {
            const ids = randomIds(numberOfExamples, 1025);
            const requests = ids.map((id) => api.get(`/pokemon/${id}`).then((r) => r.data as Pokemon));
            const results = await Promise.all(requests);
            return results;
        },
        enabled: numberOfExamples > 0,
    });
}

export function usePokemonList(page: number, limit: number) {
    return useQuery<{ count: number; results: { name: string; url: string }[] }, Error>({
        queryKey: ['pokemon-list', page, limit],
        queryFn: async () => {
            const offset = page * limit;
            const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
            return res.data as { count: number; results: { name: string; url: string }[] };
        },
    });
}

export function useTypesList() {
    return useQuery<{ results: TypeItem[] }, Error>({
        queryKey: ['types'],
        queryFn: async () => {
            const res = await api.get('/type');
            return res.data as { results: TypeItem[] };
        },
    });
}

export function useTypeDetail(typeName: string | null) {
    return useQuery<TypePokemonDetail, Error>({
        queryKey: ['type', typeName],
        queryFn: async () => {
            if (!typeName) throw new Error('no type');
            const res = await api.get(`/type/${typeName}`);
            return res.data as TypePokemonDetail;
        },
        enabled: !!typeName,
    });
}

export function usePokemonMultiple(ids: number[]) {
    return useQueries({
        queries: ids.map((id: number) => ({
            queryKey: ['pokemon', id],
            queryFn: async () => {
                const res = await api.get(`/pokemon/${id}`);
                return res.data as Pokemon;
            },
            enabled: !!id,
        })),
    });
}

export type { Pokemon, TypeItem, TypePokemonDetail, MiniPokemon };
