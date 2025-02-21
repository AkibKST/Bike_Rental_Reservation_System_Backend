import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send(' Bike rental reservation system server is running');
});

//not found
app.use(notFound as unknown as express.RequestHandler);

//error handling
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler);

export default app;
