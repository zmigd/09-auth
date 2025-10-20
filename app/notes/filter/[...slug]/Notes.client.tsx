"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useEffect, useState, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import fetchNotes from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);

  const updateSearchWord = useDebouncedCallback((value: string) => {
    setSearchWord(value);
    setPage(1);
  }, 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    updateSearchWord(value);
  };

  const { data } = useQuery({
    queryKey: ["notes", searchWord, page, tag],
    queryFn: () => fetchNotes(searchWord, page, tag),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes.length === 0) {
      toast.error("Not found...");
    }
  }, [data]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={handleChange} value={inputValue} />
        {data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>
      <Toaster />
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
