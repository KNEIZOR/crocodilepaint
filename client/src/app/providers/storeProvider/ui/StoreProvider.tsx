import { createContext, ReactNode, useContext } from 'react';
import { rootStore } from '../config/store';

const StoreContext = createContext(rootStore);

export const useStore = () => useContext(StoreContext);

interface StoreProviderProps {
    children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children } = props;

    return (
        <StoreContext.Provider value={rootStore}>
            {children}
        </StoreContext.Provider>
    );
};
