import dotenv from 'dotenv';
import { Environment } from './environment';
dotenv.config();

export const token = process.env.API_KEY || '';
export const environment = process.env.ENVIRONMENT || 'PROD';

const environments = Object.entries(Environment).map(([name, value]) => ({name, value}));
export const hostname = (environments.find(env => env.name === environment))?.value || '';
