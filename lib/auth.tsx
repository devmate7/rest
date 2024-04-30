import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [token, setToken] = useState();
	const [user, setUser] = useState();

	const loginPath = '/';
	const protectedPath = [
		'/'
	];

	useEffect(() => {
		if (!user && protectedPath.includes(router.pathname)) {
			return void router.push(loginPath);
		}

		router.push('/');
	}, [router.isReady, router.pathname, user]);

	return (
		<AuthContext.Provider value={{ token, setToken, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
