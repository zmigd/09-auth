
import css from "./LayoutNotes.module.css";

export default function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.container}>
      <main className={css.mainContent}>
        {children} 
      </main>
    </div>
  );
}
