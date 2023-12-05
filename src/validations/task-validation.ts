import { body } from 'express-validator';

export const taskInputSchema = [
  body('title')
    .isString().withMessage('Title should be a string')
    .isLength({ min: 3 }).withMessage("Title should be greater than 3 character")
    .notEmpty().withMessage('title is required')
    .trim()
    .escape()
    .exists(),
  body('description')
    .isString()
    .isLength({ max: 500 })
    .trim()
    .escape()
    .optional(),
  body('status')
    .isString()
    .notEmpty()
    .trim()
    .escape()
]