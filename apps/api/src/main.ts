import * as express from 'express';
import { addPocketAuthRoutes } from './app/pocket/auth';

const app = express();

app.use(express.json());
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
addPocketAuthRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
