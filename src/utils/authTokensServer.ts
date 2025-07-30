import { cookies } from "next/headers";
const token_key = 'auth_token'
export const getTokenServerSide = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    const token = cookieStore?.get(token_key)?.value || null;
    return token;
};

export const setTokenServerSide = async (token: string): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(token_key, token)
};

export const deleteTokenServerSide = async (): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.delete(token_key)
};


