// app/notes/[id]/page.tsx
import type { Metadata } from "next";
import { getSingleNote } from "@/lib/api";

type Props = {
  params: { id: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getSingleNote(params.id);

  if (note) {
    const title = `${note.title} — NoteHub`;
    const description =
      note.content?.slice(0, 120).replace(/\n/g, " ") ||
      "Перегляньте деталі цієї нотатки у NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub.example.com/notes/${params.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub Note Details",
          },
        ],
      },
    };
  }

 
  return {
    title: "Нотатку не знайдено — NoteHub",
    description: "На жаль, нотатку, яку ви шукаєте, не знайдено.",
    openGraph: {
      title: "Нотатку не знайдено — NoteHub",
      description: "Ця нотатка відсутня або була видалена.",
      url: `https://notehub.example.com/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Note Missing",
        },
      ],
    },
  };
}


export default async function NotePage({ params }: Props) {
  const note = await getSingleNote(params.id);

  if (!note) {
    return (
      <div>
        <h2>Нотатку не знайдено</h2>
        <p>Ця нотатка могла бути видалена або переміщена.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
