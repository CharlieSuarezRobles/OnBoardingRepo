import { body } from "express-validator";

/*const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
    */ //Not needed because it seems like the HTTP request doesn't have an ID as an input but rather
//the backend itself is the one assigning an ID to the user.
const makeNameValidator = () =>
  body("name").notEmpty().isString().isLength({ min: 1, max: 50 }).trim();
const makeProfileValidator = () =>
  body("profilePictureURL")
    .optional()
    .isURL()
    .withMessage("Must be a valid URL")
    .matches(/\.(jpg|jpeg|png|gif|bmp|svg)$/i)
    .withMessage("URL must point to an image (e.g., .jpg, .png")
    .trim();

export const createUser = [
  // ...
  makeNameValidator(),
  makeProfileValidator(),
];
