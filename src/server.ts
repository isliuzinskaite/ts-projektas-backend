import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';
import authRouter from './routers/auth-router';
import locationsRouter from './routers/locations-router';
import propertiesRouter from './routers/properties-router';
import regionsRouter from './routers/regions-router';

const server = express();

// Middlewares
server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/regions', regionsRouter);
server.use('/api/locations', locationsRouter);
server.use('/api/properties', propertiesRouter);

mongoose.connect(
  config.db.connectionUrl,
  {
    retryWrites: true,
    w: 'majority'
  },
  (error) => {
    if (error) {
      console.log(`Oi, nepavyko prisijungti:\n${error.message}`);
      return;
    }
    console.log('Sėkmingai prisijungta prie MongoDB');
    server.listen(1337, () => console.log(`Serveris veikia: http://localhost:1337`));
  }
);
