import { RequestHandler } from "express";
import createHttpError from "http-errors";
//import task from "src/models/task";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  const tasks = req.body;
  try {
    // your code here

    const taskSet = await TaskModel.find(tasks).sort({ dateCreated: -1 });

    if (!taskSet || taskSet.length == 0) {
      throw createHttpError(404, "Task not found");
    }

    res.status(200).json(taskSet);
  } catch (error) {
    next(error);
  }
};
