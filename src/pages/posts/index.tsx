import { GetStaticProps } from 'next';
import Head from 'next/head';
import { dateFormat } from '../../utils/dateFormat';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import styles from './style.module.scss';

type Post = {
	slug: string;
	title: string;
	excerpt: string;
	updateAt: string;
};

interface PostsProps {
	posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts | Estudos Next</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map((post) => (
						<a href="#">
							<time>{post.updateAt}</time>
							<strong>{post.title}</strong>
							<p>{post.excerpt}</p>
						</a>
					))}
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient();

	const response = await prismic.query(
		[Prismic.predicates.at('document.type', 'publication')],
		{
			fetch: ['publication.title', 'publication.content'],
			pageSize: 100,
		}
	);
	const posts = response.results.map((post) => {
		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			excerpt:
				post.data.content.find((content) => content.type === 'paragraph')
					?.text ?? '',
			updateAt: dateFormat(
				post.last_publication_date,
				'pt-BR',
				'2-digit',
				'long',
				'numeric'
			),
		};
	});

	return {
		props: { posts },
	};
};
