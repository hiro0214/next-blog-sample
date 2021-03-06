import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { client } from '../api/client';
import styles from '../styles/style.module.css';

type props = {
  blogs: blog[];
}

type blog = {
  id: string,
  title: string,
  content: string
  img: string;
}

const Home: NextPage<props> = (props) => {
  const { blogs } = props;
  const [fetchData, setFetchData] = useState(blogs);

  const fetcher = async(endpoint: string) => await client.get({ endpoint: endpoint });
  const {data: fetchBlogs, mutate} = useSWR('blogs', fetcher, {
    fallback: blogs,
    revalidateOnFocus: false
  })

  useEffect(() => {
    mutate();
    if (fetchBlogs) setFetchData(fetchBlogs.contents)
  }, [fetchBlogs])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Blog Lists(SG)</h1>
        <div className={styles.nav}>
          <Link href='/'>SG</Link>
          <Link href='/blog-csr'>CSR</Link>
          <Link href='/blog-ssr'>SSR</Link>
        </div>
        <ul className={styles.list}>
          {fetchData.map((blog: blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await client.get({ endpoint: 'blogs' })

  return {
    props: { blogs: blogs.contents },
    revalidate: 3
  };
}

export default Home
