import css from "./[...slug]/LayoutNotes.module.css";

type FilterLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>

      <div className={css.notesWrapper}>
        <main className={css.mainContent}>{children}</main>
      </div>
    </div>
  );
}
