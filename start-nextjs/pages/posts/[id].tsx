import Head from "next/head"
import Layout from "../../component/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Date from "../../component/date"

export default function Post({ postData }) {

  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <p>{postData.id}</p>
      <article>
        <h1 className={'headingXl'}>{postData.title}</h1>
        <div className={'lightTexts'}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// 动态路由
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
