import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api', router);

// const test = async (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

app.get('/', (req: Request, res: Response) => {
  res.send(' Bike rental reservation system server is running');
});

//not found
app.use(notFound);

app.use(globalErrorHandler);

export default app;
