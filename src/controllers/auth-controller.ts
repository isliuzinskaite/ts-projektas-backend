import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import AdminModel from '../models/admin-model';
import createAdminViewModel from '../view-model-creators/create-admin-view-model';

export const register: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email) throw new Error('Privalomas el. paštas');
    if (!password) throw new Error('Privalomas slaptažodis');
    if (!name) throw new Error('Privalomas vardas');

    const hashedPassword = bcrypt.hashSync(password, 5);
    const adminDoc = await AdminModel.create({ email, name, password: hashedPassword });
    const token = jwt.sign({ email }, config.token.secret);

    res.status(201).json({
      user: createAdminViewModel(adminDoc),
      token: `Bearer ${token}`,
    });
  } catch (error) {
    let message = 'Serverio klaida registruojantis';

    if (error instanceof Error.ValidationError) {
      if (error.errors.email) {
        message = 'Toks paštas jau yra';
      }
    } else if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({
      error: message,
    });
  }
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) throw new Error('Privalomas el. paštas');
    if (!password) throw new Error('Privalomas slaptažodis');

    const adminDoc = await AdminModel.findOne({ email });
    if (adminDoc === null) throw new Error(`Vartotojas su paštu '${email}' nerastas`);
    
    const passwordIsCorrect = bcrypt.compareSync(password, adminDoc.password);
    if (!passwordIsCorrect) throw new Error('Slaptažodis neteisingas');

    const token = jwt.sign({ email }, config.token.secret);
    res.status(200).json({
      admin: createAdminViewModel(adminDoc),
      token: `Bearer ${token}`,
    });
  } catch(error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : ' Serverio klaida prisijungiant',
    });
  }
};
