import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from './components/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
<Component {...pageProps} />
    </div>

  );
}
