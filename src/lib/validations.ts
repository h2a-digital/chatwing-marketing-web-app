import { z } from 'zod';

// Shared validation schema for contact form (used in both client and server)
export const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120, 'Name is too long'),
  email: z.string().email('Please enter a valid email address').max(200, 'Email is too long'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
  hp: z.string().optional(), // honeypot field
});

export type ContactFormData = z.infer<typeof ContactSchema>;
