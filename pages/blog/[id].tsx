import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link';
import { client } from '../../api/client';
import styles from '../../styles/style.module.css';

type props = {
  blog: blog;
}

type blog = {
  id: string,
  title: string,
  content: string
  img: string;
}

const Blog: NextPage<props> = (props) => {
  const { blog } = props;

  return (
    <main>
      <Link href={'/'} passHref>
        <span className={styles.btn}>TOPへ</span>
      </Link>
      <div className={styles.blog}>
        <p>id: {blog.id}</p>
        <p>title: {blog.title}</p>
        <p>content: {blog.content}</p>
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await client.get({ endpoint: 'blogs' });
  const paths = blogs.contents.map((blog: blog) => ({
    params: { id: blog.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = await client.get({ endpoint: `blogs/${params!.id}`});

  return {
    props: { blog },
    revalidate: 3
  };
}

export default Blog;