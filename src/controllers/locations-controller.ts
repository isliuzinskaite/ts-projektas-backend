import { RequestHandler } from "express";
import { Error } from 'mongoose';
import mongoose from 'mongoose'; // https://stackoverflow.com/questions/38446346/mongoose-string-to-objectid
import LocationModel from "../models/location-model";
import createLocationViewModel, { LocationViewModel } from '../view-model-creators/create-location-view-model';

type ErrorMessagesLT = {
  price: string,
  persons: string,
  region: string,
}

const locationValidationErrorMessagesLT: ErrorMessagesLT = {
  price: 'Trūksta kainos',
  persons: 'Trūksta asmenų skaičiaus',
  region: 'Trūksta regiono',
}

const errorMessageGuard = (property: string): property is keyof ErrorMessagesLT => {
  return property in locationValidationErrorMessagesLT;
}

const formatLocationValidationError = (validationError: Error.ValidationError) => {
  const errorArray = Object.entries(validationError.errors);
  for (let i = 0; i < errorArray.length; i++) {
    const [property] = errorArray[i];  
    if(property in locationValidationErrorMessagesLT) {
      return locationValidationErrorMessagesLT[property as keyof ErrorMessagesLT];
    }
  }
  return 'Trūksta duomenų';
}

export const getLocations: RequestHandler = async (req, res) => {
  const locations = await LocationModel.find();
  res.status(200).json(locations.map((location) => createLocationViewModel(location)));
};

export const getLocation: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    // Validacijos klaidai
    // https://stackoverflow.com/questions/38446346/mongoose-string-to-objectid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant lokacijos: nevalidus id ${id}`,
      });
      return;
    }
    const location = await LocationModel.findById(id);
    if (location) {
       res.status(200).json({
        location: createLocationViewModel(location),
      });
    } else {
      res.status(404).json({
        error: `Lokacija su id ${id} nerasta`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida ieškant lokacijos',
    });
  }
}

export const createLocation: RequestHandler = async (req, res) => {
  const locationProps = req.body;
  try {
    const createdLocation = await LocationModel.create(locationProps);
    res.status(201).json(createLocationViewModel(createdLocation));
  } catch (err) {
    let error: string;
    if(err instanceof Error.ValidationError){
      error = formatLocationValidationError(err);   
    } else{
      error = 'Serverio klaida';
    }
    res.status(400).json({ error });
  } 
}

export const updateLocation: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const locationProps = req.body;

  try {
     if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant lokacijos: nevalidus id ${id}`,
      });
      return;
    }
    const location = await LocationModel.findByIdAndUpdate(id, locationProps, { new: true });
    if (location) {
      res.status(200).json({
        location: createLocationViewModel(location)
      });
    } else {
      res.status(404).json({
        error: `Lokacija su id ${id} nerasta`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida atnaujinant lokaciją',
    });
  }
}

export const deleteLocation: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant lokacijos: nevalidus id ${id}`,
      });
      return;
    }
    const location = await LocationModel.findByIdAndDelete(id);
    if (location) {
      res.status(200).json({
        location: createLocationViewModel(location),
      });
    } else {
      res.status(404).json({
        error: `Lokacija su id ${id} nerasta`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida trinant lokaciją',
    });
  }
}
