import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import locationsRouter from './routers/locations-router';

const server = express();

// Middlewares
server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/locations', locationsRouter);

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.lgf8s.mongodb.net',
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
