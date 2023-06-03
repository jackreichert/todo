import {createContext} from "react";
import {AppContextType} from "./types/";

export const AppContext = createContext<AppContextType>({
    tasks: [{task: '', status: false}],
    setTasks: () => {
        // intentionally empty
    }
});
