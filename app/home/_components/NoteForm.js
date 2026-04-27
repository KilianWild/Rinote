"use client";
import { useGlobalContext } from "@/app/global-provider";

export default function NoteForm({}) {
  const { notes, setNotes } = useGlobalContext();

  function handleSubmit(event) {
    event.preventDefault();

    const formDataObject = new FormData(event.target);
    const data = Object.fromEntries(formDataObject);

    setNotes([...notes, data]);

    event.target.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col justify-center bg-zinc-900 p-6"
    >
      <h2 className="self-center text-lg font-semibold text-zinc-700">
        New Note
      </h2>

      <input
        name="title"
        type="text"
        placeholder="Title"
        className="mt-3 w-[80%] border-b-2 border-[#4a4a6a] p-2 text-sm focus:outline-none"
      />

      <textarea
        name="text"
        placeholder="Write your note..."
        className="notebook mt-3 mb-0 flex-1 resize-none rounded border-none px-2 pb-2 text-sm focus:outline-none"
      />

      <input
        name="inquiry"
        type="text"
        placeholder="Theme of Inquiry"
        className="right-0 mt-0 w-[80%] self-end border-b-2 border-[#4a4a6a] px-2 pb-2 text-sm focus:outline-none"
      />

      <div className="mt-10 flex flex-row justify-center gap-3">
        <button
          type="submit"
          className="rounded bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-300"
        >
          Mic
        </button>
        <button
          type="submit"
          className="rounded bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-300"
        >
          Save Note
        </button>
        <button
          type="submit"
          className="rounded bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-300"
        >
          Photo
        </button>
      </div>
    </form>
  );
}
