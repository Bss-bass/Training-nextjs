import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoritesState = {
  favorites: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (id: number) =>
        set((state) => ({ favorites: Array.from(new Set([...state.favorites, id])) })),
      remove: (id: number) => set((state) => ({ favorites: state.favorites.filter((f) => f !== id) })),
      toggle: (id: number) => {
        const favs = get().favorites;
        if (favs.includes(id)) get().remove(id);
        else get().add(id);
      },
    }),
    { name: 'pokedex_favorites' }
  )
);

export default useFavorites;
