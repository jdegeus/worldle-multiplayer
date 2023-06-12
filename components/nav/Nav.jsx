"use client";

import styles from './styles.module.css';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav id={styles.nav}>
      {session?.user ? (
        <div>
          <button type='button' onClick={signOut}>
            Log out
          </button>
          <Image src={session.user.image} alt={session.user.name} width={100} height={100}/>
        </div>
      ) : (pathname !== "/login" ?
        <Link href="/login">Log in</Link> : null)}
    </nav>
  );
};

export default Nav;