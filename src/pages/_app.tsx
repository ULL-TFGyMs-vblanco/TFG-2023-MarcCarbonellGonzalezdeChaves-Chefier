import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Raleway } from '@next/font/google';

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${raleway.variable} ${raleway.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
