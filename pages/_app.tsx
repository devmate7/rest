import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.sass';

import { AuthProvider } from '@/lib/auth';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}
