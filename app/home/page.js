"use client";
import NoteForm from "./_components/NoteForm";
import GestureButton from "../_components/GestureButton";
import useGesture from "../../hooks/useGesture";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useGesture(50, (direction) => {
    if (direction === "right") router.push("/notes-list");
  });

  return (
    <>
      <main className="flex h-screen w-full items-center justify-center bg-zinc-950">
        <section className="h-screen w-full p-4">
          <NoteForm />
        </section>
      </main>
    </>
  );
}
