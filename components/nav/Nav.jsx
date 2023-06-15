"use client";

import styles from './styles.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import DefaultButton from '../buttons/defaultButton';

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav id={styles.nav}>
      {session?.user ? (
        <div>
          <DefaultButton trigger={signOut}>Log out</DefaultButton>
          <Image src={session.user.image} alt={session.user.name} width={100} height={100}/>
        </div>
      ) : <>
          {/* <Link href="/auth/signin">Log in</Link> */}
          <DefaultButton trigger={signIn}>Log In</DefaultButton>
        </>}

    </nav>
  );
};

export default Nav;