import Hotel from "../models/Hotels.js";

//create hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//update hotel
export const updateHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

//delete hotel
export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

//get hotel
export const getHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//getAll hotels
// export const getAllHotels = async (req, res, next) => {
//   try {
//     const hotels = await Hotel.find();
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };
export const getAllHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 5000 },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
