"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import { useNoteStore, DraftNote } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  
  const mutation = useMutation({
    mutationFn: async (newNote: DraftNote) => await createNote(newNote),
    onSuccess: () => {
      toast.success("Note created successfully!");
      clearDraft(); 
      queryClient.invalidateQueries({ queryKey: ["notes"] }); 
      router.back(); 
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (draft.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    mutation.mutate(draft as DraftNote); 
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter note title..."
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
          placeholder="Write your note content..."
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending} 
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
