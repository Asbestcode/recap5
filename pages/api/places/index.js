import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";
import { defaultPlaces } from '../../../lib/db';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  } 
  
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      console.log(placeData);
      const place = new Place(placeData);
      await place.save();
      response.status(201).json({ status: "Place created"});
    } catch (error){
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const places = await Place.find();
      for(let place of places) {
        const id = place._id;
        await Place.findByIdAndDelete(id)
      }
      for(let defaultPlace of defaultPlaces) {
        const place = new Place(defaultPlace);
        await place.save();
      }
      response.status(201).json({ status: "Places reseted"});
    } catch (error){
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}