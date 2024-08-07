
import React, { createContext, useState, useContext } from 'react';

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
    
    const [isToggled, setIsToggled] = useState(false);



    return (
        <ToggleContext.Provider value={{ isToggled, setIsToggled }}>
            {children}
        </ToggleContext.Provider>
    );
};

