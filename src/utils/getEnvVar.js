import dotenv from 'dotenv';
dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const raw = process.env[name];
  const value = typeof raw === 'string' ? raw.trim() : raw;

  if (value !== undefined && value !== '') return value;

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`Environment variable ${name} is not set`);
};