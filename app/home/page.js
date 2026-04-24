import NoteForm from "./_components/NoteForm";

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-zinc-950">
      <section className="h-screen w-full p-4">
        <NoteForm />
      </section>
    </main>
  );
}
