import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note } from "@/types/note";

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface newNote {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<fetchNotesResponse> => {
  const response = await nextServer.get<fetchNotesResponse>(`/notes`, {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
};

export const createNote = async (newNote: newNote): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, newNote, {});
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {});
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {});
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
