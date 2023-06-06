import {createContext} from "react";
import {AppContextType} from "./types/";

export const AppContext = createContext<AppContextType>({
    tasks: [{title: '', status: false}],
    setTasks: () => {
        // intentionally empty
    }
});
