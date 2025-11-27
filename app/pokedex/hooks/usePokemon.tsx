"use client";

import { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

type Pokemon = {
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

export function usePokemon(name?: string | null) {
    const query = useQuery<Pokemon, Error>({
        queryKey: ['pokemon', name],
        queryFn: async () => {
            if (!name) throw new Error('No name');
            const res = await api.get(`/pokemon/${name}`);
            return res.data as Pokemon;
        },
        enabled: !!name,
    });

    const displayName = useMemo(() => {
        return query.data?.species?.name ?? name ?? '';
    }, [query.data, name]);

    return {
        data: query.data ?? null,
        loading: query.isLoading,
        error: query.error as Error | null,
        refetch: query.refetch,
        displayName,
    } as const;
}

export type { Pokemon };
