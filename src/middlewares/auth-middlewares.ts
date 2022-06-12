import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import AdminModel from '../models/admin-model';

type DecodedInfo = { email: string, iat?: number };

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader === undefined) throw new Error('Reikalingas prisijungimas');
    
    const token = authHeader.split(' ')[1];
    if (token === undefined) throw new Error('Klaidingi vartotojo atpažinimo duomenys');

    const decodedInfo = jwt.verify(token, config.token.secret) as DecodedInfo;
    req.tokenData = {
      email: decodedInfo.email,
    };

    next();
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : 'Klaida atpažįstant vartotoją',
    });
  }
};

export const adminMiddleware: RequestHandler = async (req, res, next) => {
  if (req.tokenData === undefined) {
    res.status(401).json({
      error: 'Reikalingas Prisijungimas',
    });
    return;
  }

  const authAdminDoc = await AdminModel.findOne({ email: req.tokenData.email });

  if (authAdminDoc === null) {
    res.status(404).json({
      error: 'Autentifikuojamas vartotojas nerastas',
    });
    return;
  }
  
  req.authAdminDoc = authAdminDoc;
  next();
};
