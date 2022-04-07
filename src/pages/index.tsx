import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from '../styles/home/style.module.scss';
import { CurrencyCustomized } from '../utils/currencyFormat';

/**
 * Client-Side => (CS)
 * Server-Side => (SSR)
 * Static-site-Generation => (SSG)
 */

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
	// const x = fetch('http://localhost:3000/api/users')
	// 	.then((response) => response.json())
	// 	.then((re) => re);
	// console.log(x);

	return (
		<>
			<Head>
				<title>Home | Estudos Next</title>
			</Head>
			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span>👏 Hey, welcome</span>
					<h1>
						News about the <span>React</span> world.
					</h1>
					<p>
						Get access to all the publications <br />
						<span>
							for {CurrencyCustomized('en-US', 'USD', product.amount)} month
						</span>
					</p>
					<SubscribeButton priceId={product.priceId} />
				</section>
				<img src="/images/avatar.svg" alt="Girl coding" />
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1KlYhhDc6tpJ52Wefezj7uSk');

	const product = { priceId: price.id, amount: price.unit_amount / 100 };
	return {
		props: { product },
		revalidate: 60 * 60 * 24, // 24 hours
	};
};
