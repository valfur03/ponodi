import { Express } from 'express';
import pocketServiceInstance from '../../services/pocket';

export function addPocketAuthRoutes(app: Express) {
	app.post('/api/pocket/request', async (req, res) => {
		return pocketServiceInstance.getRequestToken()
			.then((response) => res.json({
					message: 'Success',
					code: response.code,
				})
			)
			.catch((error) => {
				console.error(error);
				return res.status(500).json({
					message: 'An unexpected error occured... Please try again later.',
					error: error.error,
				});
			})
	});
}
