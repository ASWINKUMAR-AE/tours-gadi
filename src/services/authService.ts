export interface Admin {
    id: number;
    username: string;
    name: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    admin: Admin;
}

const AUTH_KEY = 'wave_cabs_admin_auth';

export const authService = {
    /**
     * Login an admin
     */
    login: async (username: string, password: string): Promise<AuthResponse> => {
        // Simple mock login for admin / admin
        if (username.toLowerCase() === 'admin' && password === 'admin') {
            const data: AuthResponse = {
                success: true,
                token: 'mock-jwt-token-xyz-123',
                admin: {
                    id: 1,
                    username: 'admin',
                    name: 'System Administrator'
                }
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(data));
            return data;
        }
        
        throw new Error('Invalid credentials');
    },

    /**
     * Logout an admin
     */
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },

    /**
     * Check if an admin is authenticated
     */
    isAuthenticated: (): boolean => {
        const auth = localStorage.getItem(AUTH_KEY);
        return !!auth;
    },

    /**
     * Get current admin info
     */
    getCurrentAdmin: (): Admin | null => {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth) return null;
        return JSON.parse(auth).admin;
    },

    /**
     * Get auth token
     */
    getToken: (): string | null => {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth) return null;
        return JSON.parse(auth).token;
    }
};
