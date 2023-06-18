import styles from './page.module.css'
import Head from 'next/head'
import Layout from './layout'
import TableList from './tableList'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Lerna Discrete</title>
      </Head>
      <div>123</div>
      <TableList />
    </Layout>
  )
}
