"use client";
import { Suspense } from "react";
import NoteForm from "./_components/NoteForm";
import useGesture from "../../hooks/useGesture";
import { useGlobalContext } from "../global-provider";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const { notes, setNotes } = useGlobalContext();
  const router = useRouter();
  const searchparams = useSearchParams();

  const editId = searchparams.get("editid");

  //const isEditMode = Boolean(editId);
  const noteToEdit = notes.find((note) => note.id === editId);

  useGesture(50, (direction) => {
    if (direction === "right") router.push("/notes-list");
  });

  return (
    <Suspense>
      <section className="flex h-screen w-full items-center justify-center bg-zinc-950 p-4">
        <NoteForm noteToEdit={noteToEdit} />
      </section>
    </Suspense>
  );
}
