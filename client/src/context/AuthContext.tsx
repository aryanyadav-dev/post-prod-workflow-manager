// import React, {
//     createContext,
//     useState,
//     useContext,
//     ReactNode
// } from 'react';
// import { authService } from '../services/authService';
//
// interface AuthContextType {
//     isAuthenticated: boolean;
//     login: (username: string, password: string) => Promise<void>;
//     logout: () => void;
//     register: (username: string, password: string) => Promise<void>;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
//
//     const login = async (username: string, password: string) => {
//         try {
//             await authService.login({ username, password });
//             setIsAuthenticated(true);
//             authService.setupAxiosInterceptors();
//         } catch (error) {
//             setIsAuthenticated(false);
//             throw error;
//         }
//     };
//
//     const logout = () => {
//         authService.logout();
//         setIsAuthenticated(false);
//     };
//
//     const register = async (username: string, password: string) => {
//         try {
//             await authService.register({ username, password });
//             // Optionally, auto-login after registration
//             await login(username, password);
//         } catch (error) {
//             throw error;
//         }
//     };
//
//     return (
//         <AuthContext.Provider value={{
//             isAuthenticated,
//             login,
//             logout,
//             register
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// import React, {
//     createContext,
//     useState,
//     useContext,
//     ReactNode,
//     useEffect
// } from 'react';
// import { authService } from '../services/authService';
//
// interface AuthContextType {
//     isAuthenticated: boolean;
//     login: (username: string, password: string) => Promise<void>;
//     logout: () => void;
//     register: (username: string, password: string) => Promise<void>;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
//
//     // Setup interceptors when the provider mounts
//     useEffect(() => {
//         if (isAuthenticated) {
//             authService.setupAxiosInterceptors();
//         }
//
//         // Check token validity on mount
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Update authentication state based on token presence
//             setIsAuthenticated(true);
//             authService.setupAxiosInterceptors();
//         }
//     }, []);
//
//     const login = async (username: string, password: string) => {
//         try {
//             const token = await authService.login({ username, password });
//             setIsAuthenticated(true);
//             authService.setupAxiosInterceptors();
//             return token;
//         } catch (error) {
//             setIsAuthenticated(false);
//             // Clean up any existing tokens on login failure
//             localStorage.removeItem('token');
//             throw error;
//         }
//     };
//
//     const logout = () => {
//         authService.logout();
//         setIsAuthenticated(false);
//         // Clear interceptors on logout
//         authService.setupAxiosInterceptors(); // This will remove existing interceptors
//     };
//
//     const register = async (username: string, password: string) => {
//         try {
//             await authService.register({ username, password });
//             // Auto-login after registration
//             return await login(username, password);
//         } catch (error) {
//             throw error;
//         }
//     };
//
//     return (
//         <AuthContext.Provider value={{
//             isAuthenticated,
//             login,
//             logout,
//             register
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [error, setError] = useState<string | null>(null);

    // Setup interceptors when the provider mounts
    useEffect(() => {
        if (isAuthenticated) {
            authService.setupAxiosInterceptors();
        }
    }, [isAuthenticated]);

    const login = async (username: string, password: string) => {
        try {
            const token = await authService.login({ username, password });
            setIsAuthenticated(true);
            authService.setupAxiosInterceptors();
            setError(null); // Reset error on successful login
            return token;
        } catch (error) {
            setIsAuthenticated(false);
            setError("Login failed. Please try again.");
            localStorage.removeItem('token');
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        authService.setupAxiosInterceptors();
    };

    const register = async (username: string, password: string) => {
        try {
            await authService.register({ username, password });
            return await login(username, password); // Auto-login after registration
        } catch (error) {
            setError("Registration failed. Please try again.");
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
