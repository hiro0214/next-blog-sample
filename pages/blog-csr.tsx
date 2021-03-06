import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client } from '../api/client';
import styles from '../styles/style.module.css';

type blog = {
  id: string,
  title: string,
  content: string
  img: string;
}

const BlogCSR: NextPage = () => {
  const [blogList, setBlogList] = useState<blog[]>([])

  useEffect(() => {
    client.get({endpoint: 'blogs'}).then(res => setBlogList(res.contents))
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Blog Lists(CSR)</h1>
        <div className={styles.nav}>
          <Link href='/'>SG</Link>
          <Link href='/blog-csr'>CSR</Link>
          <Link href='/blog-ssr'>SSR</Link>
        </div>
        <ul className={styles.list}>
          {blogList.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default BlogCSR;