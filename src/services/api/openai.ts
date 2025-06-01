import { isBase64DataUri } from "@/src/utils/fileutils";
import axios, { isAxiosError } from "axios";
import {
  CHAT_COMPLETION_CONFIG,
  IMAGE_ANALYSIS_PROMPT,
  SYSTEM_PROMPT,
  VISION_COMPLETION_CONFIG,
} from "../../constants/openai";
import { API_CONFIG } from "./config";

const openAIClient = axios.create({
  baseURL: API_CONFIG.OPENAI_API_URL,
  headers: {
    Authorization: `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
  timeout: 30000,
});

export interface ChatCompletionRequest {
  model: string;
  messages: {
    role: "user" | "assistant" | "system";
    content:
      | string
      | {
          type: "text" | "image_url";
          text?: string;
          image_url?: {
            url: string;
          };
        }[];
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
      const response = await openAIClient.post<ChatCompletionResponse>(
        "/chat/completions",
        {
          ...CHAT_COMPLETION_CONFIG,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: question,
            },
          ],
        }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Falha ao obter resposta do OpenAI";
        console.error("OpenAI API Error:", {
          status: error.response?.status,
          message: errorMessage,
          details: error.response?.data,
        });
        throw new Error(errorMessage);
      }
      console.error("Unexpected error:", error);
      throw error;
    }
  },

  async analyzeImage(
    imageBase64: string,
    prompt: string
  ): Promise<ChatCompletionResponse> {
    try {
      if (!isBase64DataUri(imageBase64)) {
        throw new Error(
          "Formato de imagem inválido. Esperado base64 data URL."
        );
      }

      const response = await openAIClient.post<ChatCompletionResponse>(
        "/chat/completions",
        {
          ...VISION_COMPLETION_CONFIG,
          messages: [
            {
              role: "system",
              content: IMAGE_ANALYSIS_PROMPT,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    prompt || "Analise esta imagem e me diga o que você vê.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageBase64,
                  },
                },
              ],
            },
          ],
        }
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Falha ao analisar imagem com OpenAI";
        console.error("OpenAI Vision API Error:", {
          status: error.response?.status,
          message: errorMessage,
          details: error.response?.data,
        });
        throw new Error(errorMessage);
      }
      console.error("Unexpected error in image analysis:", error);
      throw error;
    }
  },
};
