'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationDelete = useMutation({
    mutationFn: async (id: string) => await deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  const handleOpenModal = (id: string) => {
    router.push(`/notes/${id}`); 
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          key={note.id}
          className={css.listItem}
          onClick={() => handleOpenModal(note.id)}
          style={{ cursor: "pointer" }}
        >
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            
            <Link
              href={`/notes/${note.id}`}
              className={`${css.tag} ${css["tag-link"]}`}
              onClick={(e) => e.stopPropagation()} 
            >
              View details
            </Link>

           
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                handleDeleteNote(note.id);
              }}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
