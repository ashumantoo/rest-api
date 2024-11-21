import { body } from 'express-validator';

export const userInputSchema = [
  body('firstName')
    .isString().withMessage('First name should be a string')
    .isLength({ min: 3 }).withMessage("First name should be more than 3 character")
    .notEmpty().withMessage('First name is required')
    .trim()
    .escape()
    .exists(),
  body('lastName')
    .isString().withMessage('Last name should be a string')
    .trim()
    .escape()
    .optional(),
  body('email')
    .isEmail().withMessage('Email is invalid')
    .notEmpty().withMessage("Email is required")
    .trim()
    .escape(),
  body('password')
    .isString()
    .notEmpty().withMessage("Password is required")
    .trim()
    .escape(),
  body('gender')
    .isString().withMessage('Gender should be a string')
    .notEmpty().withMessage('Gender is required'),
  body('mobile')
    .isString()
    .notEmpty().withMessage("Mobile number is required")
    .isLength({ min: 10, max: 10 }).withMessage("Mobile number should be of 10 digits only")
    .trim()
    .escape(),
  body('dob')
    .isString().withMessage("Invalid date of birth"),
  body('address.street')
    .isString().withMessage("Street should be a string")
    .trim()
    .escape(),
  body('address.city')
    .isString().withMessage("City should be a string")
    .trim()
    .escape(),
  body('address.state')
    .isString().withMessage("State should be a string")
    .trim()
    .escape(),
  body('address.country')
    .isString().withMessage("Country should be a string")
    .trim()
    .escape(),
  body('address.zipcode')
    .isString().withMessage("Zipcode should be a string")
    .trim()
    .escape(),
  body('profession')
    .isString().withMessage("Profession should be a string")
    .trim()
    .escape()
]

export const userSignupSchema = [
  body('firstName')
    .isString().withMessage('First name should be a string')
    .isLength({ min: 3 }).withMessage("First name should be more than 3 character")
    .notEmpty().withMessage('First name is required')
    .trim()
    .escape()
    .exists(),
  body('lastName')
    .isString().withMessage('Last name should be a string')
    .trim()
    .escape()
    .optional(),
  body('email')
    .isEmail().withMessage('Email is invalid')
    .notEmpty().withMessage("Email is required")
    .trim()
    .escape(),
  body('password')
    .isString()
    .notEmpty().withMessage("Password is required")
    .trim()
    .escape(),
]

export const userSigninSchema = [
  body('email')
    .isEmail().withMessage('Email is invalid')
    .notEmpty().withMessage("Email is required")
    .trim()
    .escape(),
  body('password')
    .isString()
    .notEmpty().withMessage("Password is required")
    .trim()
    .escape(),
]