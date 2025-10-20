"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../components/NotePreview/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.loader}>Loading note...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.error}>
          <p>Failed to load note details.</p>
          <button className={css.retryBtn} onClick={() => refetch()}>
            Try again
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container} key={noteId}>
        <button className={css.backBtn} onClick={handleClose}>
          ✕
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.date}>
              {note.createdAt
                ? new Date(note.createdAt).toLocaleDateString()
                : ""}
            </span>
          </div>

          <div className={css.content}>{note.content}</div>

          {note.tag && (
            <div>
              <span className={css.tag}>{note.tag}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
