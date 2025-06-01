export const API_CONFIG = {
  OPENAI_API_URL: 'https://api.openai.com/v1',
  OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
};

export const STORAGE_KEYS = {
  QUESTIONS: '@q&a:questions',
  FAVORITES: '@q&a:favorites',
} as const;
