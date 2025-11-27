'use client';

import React from 'react';

type InternalContext = {
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (id: number) => void;
};

export const FavoritesContext = React.createContext<InternalContext | undefined>(undefined);

export const FavoritesProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [favorites, setFavorites] = React.useState<number[]>([]);

    const addFavorite = React.useCallback((id: number) => {
        setFavorites((prev) => Array.from(new Set([...prev, id])));
    }, []);

    const removeFavorite = React.useCallback((id: number) => {
        setFavorites((prev) => prev.filter((favId) => favId !== id));
    }, []);

    const toggleFavorite = React.useCallback((id: number) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : Array.from(new Set([...prev, id]))));
    }, []);

    const loadData = React.useCallback(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as number[];
                setFavorites(parsed);
            } catch(error) {
                console.error('Failed to parse favorites from localStorage', error);
            }
        }
    }, []);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    React.useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export function useFavorites() {
    const ctx = React.useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');

    return {
        favorites: ctx.favorites,
        add: ctx.addFavorite,
        remove: ctx.removeFavorite,
        toggle: ctx.toggleFavorite,
    };
}

export default FavoritesProvider;
