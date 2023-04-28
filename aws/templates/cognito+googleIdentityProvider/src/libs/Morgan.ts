import morgan, { StreamOptions } from 'morgan';
import Logger from './Logger';

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
};

// Build the morgan middleware
const morgan_middleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

export default morgan_middleware;
