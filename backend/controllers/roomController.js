import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
import { createError } from "../utils/error.js";

//create room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//update room
export const updateRoom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedRoom = await Room.updateOne(
      { "roomNumbers._id": id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room Status has been updated.");
  } catch (error) {
    next(error);
  }
};

//delete room
export const deleteRoom = async (req, res, next) => {
  const { id, hotelId } = req.params;

  try {
    await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

//get room
export const getRoom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//getAll rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
