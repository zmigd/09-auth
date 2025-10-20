"use client";

import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Work", "Personal", "Shopping", "Meeting"];

export default function SidebarNotes() {
  return (
    <nav>
      <ul className={css.menuList}>
        {tags.map((tag) => {
          const href = tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
          return (
            <li key={tag} className={css.menuItem}>
              <Link href={href} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
