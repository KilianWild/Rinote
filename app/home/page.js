"use client";
import { Suspense } from "react";
import NoteForm from "./_components/NoteForm";
import useGesture from "../../hooks/useGesture";
import { useGlobalContext } from "../global-provider";
import { useRouter, useSearchParams } from "next/navigation";

export function HomeContent() {
  const { notes, setNotes } = useGlobalContext();
  const router = useRouter();
  const searchparams = useSearchParams();

  const editId = searchparams.get("editid");

  const noteToEdit = notes.find((note) => {
    console.log("note._id", note._id);
    console.log("editId", editId);
    return note._id === editId;
  });

  useGesture(50, (direction) => {
    if (direction === "right") router.push("/notes-list");
  });

  //---< rendering:
  //---------------------------------------------------------------------------------------
  return (
    <section className="flex h-screen w-full items-center justify-center bg-zinc-950 p-4">
      <NoteForm noteToEdit={noteToEdit} />
    </section>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
