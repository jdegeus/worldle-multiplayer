import '@/styles/globals.css';

import { Ubuntu } from 'next/font/google';
const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ["300", "400", "500", "700"]
});

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

import Provider from "@/components/Provider";
import Nav from '@/components/nav/Nav';

export const metadata = {
  title: 'Wordle Multiplayer',
  description: 'Play Wordle with your friend!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <main id='layout' className={ubuntu.className} data-cy="layout">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
