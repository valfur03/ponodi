import { Express } from 'express';
import { body, validationResult } from 'express-validator';
import pocketServiceInstance from '../../services/pocket';

export function addPocketAuthRoutes(app: Express) {
	app.post('/api/pocket/authorize',
			 body('code').isString(),
			 async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: 'The request is wrongly formatted...',
				error: errors.array()[0],
			});
		}
		return pocketServiceInstance.getAccessToken(req.body.code)
			.then((response) => res.json({
					message: 'Success',
					access_token: response.access_token,
					username: response.username,
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
