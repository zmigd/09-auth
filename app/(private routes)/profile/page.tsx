import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getServerMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile page",
  description:
    "Notehub app is designed for comfortable note-taking. The Profile page allows to quickly and easily update and view user profile",
  openGraph: {
    title: "Edit profile page",
    description:
      "Notehub app is designed for comfortable note-taking. The Profile page allows to quickly and easily update and view user profile",
    url: "https://08-zustand-flame-five.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub App",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
