import { createContext, useState } from 'react';


export const GlobalContext = createContext();

export const GlobalProvider = ({ children, value }) => {
  return (
    <GlobalContext.Provider value={value}> {/* Pasar el estado cinchos y la función setCinchos al contexto */}
      {children}
    </GlobalContext.Provider>
  );
};