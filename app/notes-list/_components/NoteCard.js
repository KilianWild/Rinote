"use client";
import { useState } from "react";

export default function NoteCard({ note, onMenubuttonClick }) {
  console.log("note ", note);

  function handleMenubuttonClick() {}
  return (
    <li className="relative h-64 w-full bg-zinc-900">
      <button
        onClick={handleMenubuttonClick}
        className="rounded- absolute right-0 flex h-5 w-9 flex-col justify-between rounded-sm border border-zinc-700 bg-zinc-800 p-1"
      >
        <span className="h-px w-full bg-zinc-400"></span>
        <span className="h-px w-full bg-zinc-400"></span>
        <span className="h-px w-full bg-zinc-400"></span>
      </button>
      <h3 className="absolute top-1 left-2">{note.title}</h3>
      <h4 className="absolute right-2 bottom-1">Question</h4>
    </li>
  );
}
