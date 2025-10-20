// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import css from "../app/page.module.css";

export const metadata: Metadata = {
  title: "Сторінку не знайдено — NoteHub",
  description:
    "На жаль, сторінку, яку ви шукаєте, не знайдено. Перевірте адресу або поверніться на головну сторінку NoteHub.",
  openGraph: {
    title: "404 — Сторінку не знайдено | NoteHub",
    description:
      "Ця сторінка не існує. Перейдіть на головну сторінку застосунку NoteHub.",
    url: "https://notehub.example.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/" className={css.link_back}>
        Go back
      </Link>
    </div>
  );
}
