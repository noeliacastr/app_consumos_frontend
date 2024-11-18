import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


export const useAuthStore = create(
persist(
    (set) => ({
    token: '',
    currentUser: '',
    isAuth: false,
    setToken: (newToken) => set({ token: newToken }),
    setAuth: (newAuth) => set({ isAuth: newAuth }),
    setCurrentUser: (user, auth) => set({ currentUser: user, isAuth: auth }),
    clearAuth: () => set({ token: '', currentUser: '', isAuth: false }),
    }),
    {
    name: 'authState',
    storage: createJSONStorage(() => localStorage),
    }
)
);