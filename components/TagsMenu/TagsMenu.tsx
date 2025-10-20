"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const tags: string[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/All`} className={css.menuLink} onClick={toggle}>
              All notes
            </Link>
          </li>

          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
