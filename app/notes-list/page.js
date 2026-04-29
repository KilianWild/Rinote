"use client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/global-provider";
import useGesture from "@/hooks/useGesture";
import NoteCardList from "./_components/NoteCardList";

export default function NoteList() {
  const router = useRouter();
  const { notes, setNotes } = useGlobalContext();

  function handleClickEdit(id) {
    const noteToEdit = notes.find((note) => note._id === id);
    router.push(`/home?editid=${noteToEdit._id}`);
  }

  function handleClickDelete(id) {
    setNotes((prev) => prev.filter((note) => (note._id !== id ? item : null)));
  }

  useGesture(50, (direction) => {
    if (direction === "left") router.push("/home");
  });

  //---< rendering:
  //---------------------------------------------------------------------------------------
  return (
    <>
      <NoteCardList
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    </>
  );
}
