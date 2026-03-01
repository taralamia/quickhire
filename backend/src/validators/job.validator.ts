import { body, ValidationChain } from 'express-validator';

export const submitApplicationRules: ValidationChain[] = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('type')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Remote', 'Contract'])
    .withMessage('Invalid job type'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('salary').optional().trim(),
  body('requirements').optional().trim(),
];