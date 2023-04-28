import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import routes from './routes';
import CONFIG from './config/server';
import morgan from './libs/Morgan';
import Logger from './libs/Logger';

const app = express();

const { PORT } = CONFIG;

app.use(
  cors({
    origin: 'http://localhost:5500',
    credentials: true
  })
);

const http = createServer(app); // Criando protocolo http
app.use(express.json());
app.use(morgan);
app.use(routes);

const log = Logger.info;
log(`Creating server on port ${PORT}...`);
http.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
