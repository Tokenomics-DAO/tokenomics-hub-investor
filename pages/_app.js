import '../styles/index.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
// import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

const publicPages = [
  '/',
  '/thub',
  '/terms',
  '/calculator',
  '/posts/[slug]',
  '/authors/[slug]',
  '/experts',
  '/glossary',
]

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-3MWJJK74SD' })
  }, [])
  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)
  return (
    <>
      <Head>
        <title>Tokenomics Hub</title>
        <meta charSet="UTF-8" />
        <meta
          name="Explore, compare and evaluate tokenomics of crypto projects."
          content="Created by Tokenomics DAO"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <GoogleAnalytics strategy="lazyOnload" trackPageViews />
      <ClerkProvider {...pageProps}>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  )
}

export default MyApp
