import axios from 'axios';
import { API_CONFIG } from './config';

const openAIClient = axios.create({
  baseURL: API_CONFIG.OPENAI_API_URL,
  headers: {
    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  timeout: 30000,
});

export interface ChatCompletionRequest {
  model: string;
  messages: {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const openAIService = {
  async askQuestion(question: string): Promise<ChatCompletionResponse> {
    try {
      console.log('OpenAI Request:', { question });
      const response = await openAIClient.post<ChatCompletionResponse>('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides clear and concise answers.',
          },
          {
            role: 'user',
            content: question,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
        console.log('OpenAI Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || 'Falha ao obter resposta do OpenAI');
      }
      throw error;
    }
  },
}; 