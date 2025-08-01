import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  // ...
  // extract any errors that were found by the validator
  // extract any errors that were found by the validator
  //const errors = validationResult(req);
  //const { _id, name, profilePictureURL } = req.body;

  try {
    // if there are errors, then this function throws an exception
    const { name, _id, profilePictureURL } = req.body;
    //validationErrorParser(errors);
    const user = new User({ name, _id, profilePictureURL });

    await user.save();

    // 201 means a new resource has been created successfully
    // the newly created task is sent back to the user
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the ID doesn't exist, then findById returns null
    const user = await User.findById(id);

    if (user === null) {
      throw createHttpError(404, "User not found.");
    }

    // Set the status code (200) and body (the task object as JSON) of the response.
    // Note that you don't need to return anything, but you can still use a return
    // statement to exit the function early.
    res.status(200).json(user);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};
