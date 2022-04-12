import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './style.module.scss';

interface SubscribeButtonProps {
	priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
	const [session] = useSession();
	async function handlerSubiscribe() {
		if (!session) {
			signIn('github');
			return;
		}

		try {
			const response = await api.post('/subscribe');
			const { sessionId } = response.data;

			const stripe = await getStripeJs();

			await stripe.redirectToCheckout({ sessionId: sessionId });
		} catch (err) {
			alert(err.message);
		}
	}
	return (
		<button
			type="button"
			className={styles.SubscribeButton}
			onClick={handlerSubiscribe}
		>
			Subscribe Now
		</button>
	);
}
