import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Створіть нову нотатку у застосунку NoteHub. Ваші незбережені зміни будуть збережені автоматично як draft.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Створіть нову нотатку. Draft буде збережений автоматично.",
    url: "https://notehub.example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub create note",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
