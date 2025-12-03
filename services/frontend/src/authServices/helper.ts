import { useContext } from "react";
import type { AppContextType } from "./AppContext";
import AppContext from "./AppContext";

export function useAppContext(): AppContextType {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within an AppContextProvider"
        );
    }
    return context;
}