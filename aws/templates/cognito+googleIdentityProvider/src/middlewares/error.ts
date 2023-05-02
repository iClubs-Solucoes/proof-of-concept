/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import Logger from '../libs/Logger';

export default (error: Error, __: Request, res: Response, _: NextFunction) => {
  Logger.error(error.name, error.message);

  res.status(400).json({ message: error.message });
};
