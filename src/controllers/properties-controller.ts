import { RequestHandler } from "express";
import { Error } from 'mongoose';
import mongoose from 'mongoose'; // https://stackoverflow.com/questions/38446346/mongoose-string-to-objectid
import PropertyModel from "../models/property-model";
import createPropertyViewModel, { PropertyViewModel } from '../view-model-creators/create-property-view-model';

type ErrorMessagesLT = {
  title: string,
  address: string,
  image: string,
  phone: string,
}

const propertyValidationErrorMessagesLT: ErrorMessagesLT = {
  title: 'Trūksta pavadinimo',
  address: 'Trūksta adreso',
  image: 'Trūksta paveikslėlio adreso',
  phone: 'Trūksta telefono',
}

const errorMessageGuard = (property: string): property is keyof ErrorMessagesLT => {
  return property in propertyValidationErrorMessagesLT;
}

const formatPropertyValidationError = (validationError: Error.ValidationError) => {
  const errorArray = Object.entries(validationError.errors);
  for (let i = 0; i < errorArray.length; i++) {
    const [property] = errorArray[i];  
    if(property in propertyValidationErrorMessagesLT) {
      return propertyValidationErrorMessagesLT[property as keyof ErrorMessagesLT];
    }
  }
  return 'Trūksta duomenų';
}

export const getProperties: RequestHandler = async (req, res) => {
  const properties = await PropertyModel.find();
  res.status(200).json(properties.map((property) => createPropertyViewModel(property)));
};

export const getProperty: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    // Validacijos klaidai
    // https://stackoverflow.com/questions/38446346/mongoose-string-to-objectid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant būsto: nevalidus id ${id}`,
      });
      return;
    }
    const property = await PropertyModel.findById(id);
    if (property) {
       res.status(200).json({
        property: createPropertyViewModel(property),
      });
    } else {
      res.status(404).json({
        error: `Būstas su id ${id} nerastas`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida ieškant būsto',
    });
  }
}

export const createProperty: RequestHandler = async (req, res) => {
  const propertyProps = req.body;
  try {
    const createdProperty = await PropertyModel.create(propertyProps);
    res.status(201).json(createPropertyViewModel(createdProperty));
  } catch (err) {
    let error: string;
    if(err instanceof Error.ValidationError){
      error = formatPropertyValidationError(err);   
    } else{
      error = 'Serverio klaida';
    }
    res.status(400).json({ error });
  } 
}

export const updateProperty: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const propertyProps = req.body;

  try {
     if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant būsto: nevalidus id ${id}`,
      });
      return;
    }
    const property = await PropertyModel.findByIdAndUpdate(id, propertyProps, { new: true });
    if (property) {
      res.status(200).json({
        property: createPropertyViewModel(property)
      });
    } else {
      res.status(404).json({
        error: `Būstas su id ${id} nerastas`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida atnaujinant būstą',
    });
  }
}

export const deleteProperty: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant būsto: nevalidus id ${id}`,
      });
      return;
    }
    const property = await PropertyModel.findByIdAndDelete(id);
    if (property) {
      res.status(200).json({
        property: createPropertyViewModel(property),
      });
    } else {
      res.status(404).json({
        error: `Būstas su id ${id} nerastas`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida trinant būstą',
    });
  }
}
