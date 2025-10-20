import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNotePost {
  title: string;
  content: string;
  tag: NoteTag;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

/**
 * Отримання списку нотаток з фільтрацією
 */
export default async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<NoteHttpResponse> {
  const params: Record<string, string | number> = {
    search: query,
    page,
    perPage: 12,
  };

  if (tag) params.tag = tag;

  const response = await axios.get<NoteHttpResponse>("/notes", {
    params,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

/**
 * Створення нової нотатки
 */
export async function createNote({
  title,
  content,
  tag,
}: CreateNotePost): Promise<Note> {
  const createResponse = await axios.post<Note>(
    "/notes",
    { title, content, tag },
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return createResponse.data;
}

/**
 * Видалення нотатки за ID
 */
export async function deleteNote(id: string): Promise<Note> {
  const deleteResponse = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return deleteResponse.data;
}

/**
 * Отримання нотатки за ID
 */
export async function fetchNoteById(id: string): Promise<Note> {
  const responseById = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return responseById.data;
}

/**
 * Функція для NotePreview — повертає повний Note
 * Якщо ти не хочеш реально робити API-запит, додаємо дефолтні поля
 */
export async function getSingleNote(id: string): Promise<Note> {
  return {
    id,
    title: `Note ${id}`,
    content: `This is the content of note ${id}.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tag: "Work", // або будь-який дефолтний NoteTag
  };
}
