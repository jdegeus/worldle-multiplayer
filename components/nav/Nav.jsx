"use client";

import styles from './styles.module.css';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';

const Nav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav id={styles.nav}>
      {session?.user ? (
        <div>
          <button type='button' onClick={signOut}>
            Log out
          </button>
        </div>
      ) : (pathname !== "/login" ?
        <Link href="/login">Log in</Link> : null)}
    </nav>
  );
};

export default Nav;