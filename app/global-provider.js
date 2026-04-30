"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { fetcher } from "@/lib/fetcher";
import logger from "@/lib/logger";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("notes", []);

  //---< database handling - "READ" >---
  useEffect(() => {
    fetcher("/api/notes")
      .then((data) => {
        logger.db("The following data has been retrieved >", data);
        setNotes(data);
      })
      .catch((error) => logger.error(error.status, error.info));
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
