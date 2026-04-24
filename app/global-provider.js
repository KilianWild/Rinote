"use client";

import { createContext, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("notes", []);

  return (
    <GlobalContext.Provider value={{ notes, setNotes }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
