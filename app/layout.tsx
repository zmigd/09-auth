import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub — зручний застосунок для створення нотаток",
  description:
    "NoteHub — це сучасний застосунок для створення, редагування та зберігання нотаток у зручному форматі.",
  openGraph: {
    title: "NoteHub — створюй і впорядковуй нотатки легко",
    description:
      "Зберігайте свої ідеї, нотатки та думки з NoteHub. Простий і швидкий інструмент.",
    url: "https://notehub.example.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
  },
};
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; 
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}  
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
