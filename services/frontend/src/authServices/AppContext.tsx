import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../type";

export interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    loginAsGuest: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const loginAsGuest = () => {
        console.log("I was clicked");
        const guestUser: User = {
            id: -1,
            username: "Guest",
            email: "",
            role: "guest",
            createdAt: new Date(),
            updatedAt: new Date(),
            googleId: null,
            notifyDeadlines: false,
            notifyDailySummary: false,
            notifyOverdue: false,
        };
        localStorage.setItem("token", "guest-token");
        localStorage.setItem("guest", "true");
        setUser(guestUser);
        setTimeout(() => {
            const currentToken = localStorage.getItem("token");
            if (currentToken === "guest-token") {
                localStorage.removeItem("token");
                localStorage.removeItem("guest");
                setUser(null);
            }
        }, 120000);
        window.location.href = "/guest/dashboard";
    };
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const isGuest = localStorage.getItem("guest");
            if (token && token !== "guest-token") {
                try {
                    const response = await fetch(
                        "http://localhost:8000/api/user/me",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
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
            } else if (isGuest) {
                setUser({
                    id: -1,
                    username: "Guest",
                    email: "",
                    role: "guest",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    googleId: null,
                    notifyDeadlines: false,
                    notifyDailySummary: false,
                    notifyOverdue: false,
                });
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, loading, loginAsGuest }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;
