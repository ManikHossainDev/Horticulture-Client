import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// parser options for express and cors
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
