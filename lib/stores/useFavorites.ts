import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoritesState = {
  favorites: string[];
  add: (name: string) => void;
  remove: (name: string) => void;
  toggle: (name: string) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (name: string) =>
        set((state) => ({ favorites: Array.from(new Set([...state.favorites, name])) })),
      remove: (name: string) => set((state) => ({ favorites: state.favorites.filter((f) => f !== name) })),
      toggle: (name: string) => {
        const favs = get().favorites;
        if (favs.includes(name)) get().remove(name);
        else get().add(name);
      },
    }),
    { name: 'pokedex_favorites' }
  )
);

export default useFavorites;
