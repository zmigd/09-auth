import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

type NoteModalProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteModal({ params }: NoteModalProps) {
  
  const { id } = await params;

  const queryClient = new QueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}
