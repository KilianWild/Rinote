"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { fetcher } from "@/lib/fetcher";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("notes", []);

  //---< database handling - "READ" >---
  useEffect(() => {
    fetcher("/api/notes")
      .then((data) => {
        console.info(
          "%cDatabase: The following data has been retrieved >",
          "color: DarkTurquoise ; font-weight: bold;",
          data,
        );
        setNotes(data);
      })
      .catch((error) => console.log(error.status, error.info));
  }, []);

  //---< rendering:
  //---------------------------------------------------------------------------------------
  return (
    <GlobalContext.Provider value={{ notes, setNotes }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
