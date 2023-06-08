"use client";

import styles from './styles.module.css';

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav id={styles.nav}>
      {session?.user ? (
        <div>
          <button type='button' onClick={signOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}>
                Sign in
              </button>
            ))}
        </>
      )}
    </nav>
  );
};

export default Nav;