"use client";

import { createContext, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("notes", []);

  const fetcher = async (url) => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  return (
    <GlobalContext.Provider value={{ notes, setNotes }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
