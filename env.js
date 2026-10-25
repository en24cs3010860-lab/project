import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const schema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1).default('mongodb://127.0.0.1:27017/imovies'),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must contain at least 32 characters'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  COOKIE_SECURE: z.enum(['true','false']).default('false'),
  COOKIE_SAME_SITE: z.enum(['strict','lax','none']).default('lax'),
  RAZORPAY_KEY_ID: z.string().optional().default(''),
  RAZORPAY_KEY_SECRET: z.string().optional().default(''),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional().default(''),
  LOG_LEVEL: z.string().default('info')
});
const parsed = schema.safeParse(process.env);
if (!parsed.success) { console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors); process.exit(1); }
export const env = parsed.data;
