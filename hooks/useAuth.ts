import { AuthContext } from '@/lib/auth';
import { useContext } from 'react';

export default function useAuth() {
	const { setUser } = useContext(AuthContext);
	const { setToken } = useContext(AuthContext);

	return {
		async signIn(username, password) {
			const body = new FormData();
			const method = 'POST';
			const target = '/api/signin';

			body.append('username', username);
			body.append('password', password);

			const data = await fetch(target, { method, body }).then(
				r => r.json(),
				e => (null)
			);
			const token = data.done
				? data.data.token
				: null;
			if (error) {
				console.log(error);
				alert(error.message ? error.message : error);
				return false;
			}
			if (token) {
				setToken(token);
			}
		},

		signOut() {
			setUser(null);
		}
	};
}
