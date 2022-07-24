export async function fetchRequestToken() {
	try {
		const response = await fetch('http://localhost:4200/api/pocket/authorize', {
			method: 'POST'
		});
		const data = await response.json()
			.then((json) => json)
			.catch(() => { throw null });
		if (!response.ok) throw data;
		return data.code;
	} catch (error: any) {
		throw new Error(error?.message || 'An unexpected error occured... Please try again later.');
	}
}
