import { atom, selector } from 'recoil';

export interface User {
    token: string;
    id: string;
    name: string;
    balance: number,
    authorized: boolean
}

const BACKEND_URL = 'http://localhost:3000';

export const userAtom = atom<User>({
    key: 'user',
    default: selector({
        key: 'user/default',
        get: async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    return data;
                }
            } catch (e) {
                console.error(e);
            }

            return null;
        },
    }),
});
