import React from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../../component/layout'
import { getSortedPostsData } from '../../lib/posts'

export default function Home(props: { allPosts }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>


      <section className={'eadingMd'}>

        {/* <div>{JSON.stringify(props, null, 0)}</div> */}

        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${'headingMd'} ${'padding1px'}`}>
        <h2 className={'headingLg'}>Blog</h2>
        <ul className={'list'}>
          {props.allPosts.map(({ id, date, title, contentHtml }) => (
            <li className={'listItem'} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}


export async function getStaticProps() {
  const allPosts = getSortedPostsData()
  return {
    props: {
      allPosts
    }
  }
}

