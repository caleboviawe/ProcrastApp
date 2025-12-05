import {
    createContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { User } from "../type";

export interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://localhost:8000/api/user/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const userData: User = await response.json();
                        setUser(userData);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;