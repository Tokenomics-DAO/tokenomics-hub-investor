import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  beforeAuth: (req) => {
    return middleware(req)
  },
  publicRoutes: [
    '/',
    '/thub',
    '/terms',
    '/calculator',
    '/posts/[id]',
    '/authors/[slug]',
    '/book-an-expert',
    '/glossary',
    '/tokenomics-design',
    '/[id]',
    '/privacy-policy',
    '/about-us',
    '/api/stripeHook',
    '/api/stripeSync',
  ],
})

function middleware(req: NextRequest) {
  const url = req.nextUrl
  // console.log("🚀 ~ file: middleware.tsx:7 ~ withClerkMiddleware ~ url:", url)
  const hostname = req.headers.get('host') || 'tokenomicshub.xyz'
  // console.log("🚀 ~ file: middleware.tsx:8 ~ withClerkMiddleware ~ hostname:", hostname)
  const path = url.pathname
  // console.log("🚀 ~ file: middleware.tsx:9 ~ withClerkMiddleware ~ path:", path)

  if (
    (path === '/myDesigns' ||
      path === '/newDesign' ||
      path === '/editDesign' || 
      path === '/tokenomics-design' ) &&
    !hostname.startsWith('design.') &&
    !hostname.startsWith('preview.')
  ) {
    const newHost = `design.${hostname}`
    url.host = newHost
    return NextResponse.redirect(url)
  }

  if (path === '/home') {
    // if (path === '/home' && hostname.startsWith('design.')) {
    const newHost = hostname.replace('design.', '')
    // console.log("🚀 ~ file: middleware.tsx:20 ~ withClerkMiddleware ~ newHost:", newHost)
    url.host = newHost
    url.pathname = '/'
    // console.log("🚀 ~ file: middleware.tsx:22 ~ withClerkMiddleware ~ url:", url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
