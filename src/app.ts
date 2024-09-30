import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import router from './app/router';
const app: Application = express();
type CorsOptionsCallback = (err: Error | null, allow: boolean) => void;

app.use(express.json());
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: CorsOptionsCallback) {
    if (
      !origin ||
      [
        'http://localhost:5173',
        'https://car-collection-reservation-frontend.vercel.app',
        'https://api.imgbb.com/1/upload?key=b5d58f2b65bca81795a60b4d18decd6e',
      ].includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Application route
//app.use('/api/v1/students', StudentRoute);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
