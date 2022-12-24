import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export const NotFound = () => (
  <div>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <div>
      <h2>
        Sorry, this page was not found
      </h2>
      <h3>
        <Link href="/">
          <a>Return to the homepage</a>
        </Link>
      </h3>
    </div>
  </div>
)
