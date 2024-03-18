import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

// Testing
// app.get('/', async (req: Request, res: Response) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(globalErrorHandler);

export default app;
