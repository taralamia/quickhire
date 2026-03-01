import { body, ValidationChain } from 'express-validator';

export const submitApplicationRules: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('resume_link').isURL().withMessage('Resume link must be a valid URL'),
  body('cover_note').optional().trim(),
];