import { RequestHandler } from "express";
import { Error } from 'mongoose';
import mongoose from 'mongoose'; // https://stackoverflow.com/questions/38446346/mongoose-string-to-objectid
import RegionModel from '../models/region-model';
import { LocationDocument } from '../models/location-model';
import createRegionViewModel, { RegionViewModel } from '../view-model-creators/create-region-view-model';
import createRegionPopulatedViewModel, { RegionPopulatedViewModel } from '../view-model-creators/create-region-populated-view-model';

type ErrorMessagesLT = {
  name: string,
}

const regionValidationErrorMessagesLT: ErrorMessagesLT = {
  name: 'Trūksta regiono pavadinimo',
}

const errorMessageGuard = (location: string): location is keyof ErrorMessagesLT => {
  return location in regionValidationErrorMessagesLT;
}

const formatRegionValidationError = (validationError: Error.ValidationError) => {
  const errorArray = Object.entries(validationError.errors);
  for (let i = 0; i < errorArray.length; i++) {
    const [location] = errorArray[i];  
    if(location in regionValidationErrorMessagesLT) {
      return regionValidationErrorMessagesLT[location as keyof ErrorMessagesLT];
    }
  }
  return 'Trūksta duomenų';
}

export const getRegions: RequestHandler = async (req, res) => {
  const { populate } = req.query;
  const shouldPopulateLocations = populate === 'locations';

  let regions: RegionViewModel[] | RegionPopulatedViewModel[];
  if (shouldPopulateLocations) {
    const regionPopulatedDocs = await RegionModel
      .find()
      .populate<{ locations: LocationDocument[] }>('locations');
    regions = regionPopulatedDocs.map(createRegionPopulatedViewModel);
  } else {
    const regionDocs = await RegionModel.find();
    regions = regionDocs.map(createRegionViewModel);
  }

  res.status(200).json(regions);
};

export const getRegion: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { populate } = req.query;
  const shouldPopulateLocations = populate === 'locations';

  try {
    // Validacijos klaidai
    // https://stackoverflow.com/questions/38446346/mongoose-string-to-objectid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant lokacijos: nevalidus id ${id}`,
      });
      return;
    }

    let region: RegionViewModel | RegionPopulatedViewModel;
    if (shouldPopulateLocations) {
      const regionPopulatedDoc = await RegionModel
        .findById(id)
        .populate<{ locations: LocationDocument }>('locations');
        region = createRegionPopulatedViewModel(regionPopulatedDoc);
    } else {
      const regionDoc = await RegionModel.findById(id);
      region = createRegionViewModel(regionDoc);
    }

    if (region) {
       res.status(200).json({
        region: region,
      });
    } else {
      res.status(404).json({
        error: `Regionas su id ${id} nerastas`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida ieškant lokacijos',
    });
  }
}

export const createRegion: RequestHandler = async (req, res) => {
  const regionProps = req.body;
  try {
    const createdRegion = await RegionModel.create(regionProps);
    res.status(201).json(createRegionViewModel(createdRegion));
  } catch (err) {
    let error: string;
    if(err instanceof Error.ValidationError){
      error = formatRegionValidationError(err);   
    } else{
      error = 'Serverio klaida';
    }
    res.status(400).json({ error });
  } 
}

export const updateRegion: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const regionProps = req.body;

  try {
     if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant regiono: nevalidus id ${id}`,
      });
      return;
    }
    const region = await RegionModel.findByIdAndUpdate(id, regionProps, { new: true });
    if (region) {
      res.status(200).json({
        region: createRegionViewModel(region)
      });
    } else {
      res.status(404).json({
        error: `Regionas su id ${id} nerastas`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida atnaujinant lokaciją',
    });
  }
}

export const deleteRegion: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        error: `Serverio klaida ieškant lokacijos: nevalidus id ${id}`,
      });
      return;
    }
    const region = await RegionModel.findByIdAndDelete(id);
    if (region) {
      res.status(200).json({
        region: createRegionViewModel(region),
      });
    } else {
      res.status(404).json({
        error: `Regionas su id ${id} nerastas`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Serverio klaida trinant regioną',
    });
  }
}
