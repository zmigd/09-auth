// app/notes/filter/[...slug]/page.tsx
import type { Metadata } from "next";
import fetchNotes from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { use } from "react";


type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug?.join(" ") || "усі нотатки";

  const title = `NoteHub — фільтр: ${filterName}`;
  const description = `Переглядайте нотатки, відфільтровані за тегом або категорією "${filterName}" у застосунку NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.example.com/notes/filter/${filterName}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Filter Page",
        },
      ],
    },
  };
}


export default function NotesPage({ params }: PageProps) {
  const { slug } = use(params);

  const queryClient = new QueryClient();
  const searchWord = "";
  const page = 1;
  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  queryClient.prefetchQuery({
    queryKey: ["notes", searchWord, page, tag],
    queryFn: () => fetchNotes(searchWord, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
