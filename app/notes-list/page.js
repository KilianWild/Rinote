"use client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/global-provider";
import useGesture from "@/hooks/useGesture";
import NoteCardList from "./_components/NoteCardList";

export default function NoteList() {
  const router = useRouter();
  const { notes, setNotes } = useGlobalContext();

  useGesture(50, (direction) => {
    if (direction === "left") router.push("/home");
  });
  return (
    <>
      <NoteCardList />
    </>
  );
}
