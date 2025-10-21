import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient /> 
    </HydrationBoundary>
  );
}
