import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(5000),
  hp: z.string().optional(), // honeypot
});
