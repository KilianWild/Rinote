"use client";
import { useGlobalContext } from "@/app/global-provider";

export default function NoteForm() {
  const { notes, setNotes } = useGlobalContext();

  function handleSubmit(event) {
    event.preventDefault();

    const formDataObject = new FormData(event.target);
    const data = Object.fromEntries(formDataObject);

    setNotes([...notes, data]);
    console.log("notes", notes);

    event.target.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col justify-center gap-3 bg-zinc-900 p-6"
    >
      <h2 className="text-lg font-semibold text-zinc-700">New Note</h2>

      <input
        name="noteTitle"
        type="text"
        placeholder="Title"
        className="border-b-2 border-[#4a4a6a] p-2 text-sm focus:outline-none"
      />

      <textarea
        name="noteText"
        placeholder="Write your note..."
        className="notebook flex-1 resize-none rounded border-none p-2 text-sm focus:outline-none"
      />
      <button
        type="submit"
        className="mt-6 rounded bg-orange-400 py-2 font-medium text-white transition-colors hover:bg-orange-300"
      >
        Save Note
      </button>
    </form>
  );
}
