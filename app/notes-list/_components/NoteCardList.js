"use client";
import NoteCard from "./NoteCard";
import { useGlobalContext } from "@/app/global-provider";
import { useState, useEffect } from "react";

export default function NoteCardList({}) {
  const { notes, setNotes } = useGlobalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ul className="flex flex-col gap-2 p-4">
      {notes.map((note, index) => {
        return <NoteCard note={note} key={index} />;
      })}
    </ul>
  );
}
