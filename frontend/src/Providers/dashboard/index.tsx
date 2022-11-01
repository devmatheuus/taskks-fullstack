import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction
} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

interface IDashProviderProps {
    children: ReactNode;
}

interface IDashProvider {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    logout: () => void;
}

const DashContext = createContext<IDashProvider>({} as IDashProvider);

export const UseDash = () => {
    const context = useContext(DashContext);

    return context;
};

export const DashProvider = ({ children }: IDashProviderProps) => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        localStorage.clear();

        history.push('/');
    };

    return (
        <DashContext.Provider value={{ setShowModal, showModal, logout }}>
            {children}
        </DashContext.Provider>
    );
};
