"use client";

import styles from './page.module.css';

import { useEffect, useState } from "react";

import { signIn, getProviders } from "next-auth/react";

export default function Login() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div id={styles.page} data-cy="loginpage">
      <div className={styles.inner_page}>
        {providers &&
          Object.values(providers).map((provider) => (
            <div className={styles.button}
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}>
              Log in with {provider.name}
            </div>
          ))}
      </div>
    </div>
  )
}