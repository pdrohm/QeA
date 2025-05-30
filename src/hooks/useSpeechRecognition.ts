import Constants from 'expo-constants';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface SpeechRecognitionResult {
  value: string[];
}

interface SpeechRecognitionError {
  message: string;
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSimulator, setIsSimulator] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setIsSimulator(Constants.appOwnership === 'expo');
    }
  }, []);

  useSpeechRecognitionEvent('result', (event) => {
    if (event.results[0]?.transcript) {
      setTranscript(event.results[0].transcript);
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.error('Erro no reconhecimento de fala:', event.error, event.message);
    setIsListening(false);
    if (isSimulator) {
      console.warn('Reconhecimento de fala não está funcionando no simulador. Por favor, teste em um dispositivo físico.');
    }
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
  });

  const startListening = useCallback(async () => {
    try {
      if (isSimulator) {
        console.warn('Reconhecimento de fala não está funcionando no simulador. Por favor, teste em um dispositivo físico.');
      }

      setIsListening(true);
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      
      if (!granted) {
        console.error('Permissão para usar reconhecimento de fala foi negada');
        setIsListening(false);
        return;
      }

      await ExpoSpeechRecognitionModule.start({
        lang: 'pt-BR',
      });
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento de fala:', error);
      setIsListening(false);
    }
  }, [isSimulator]);

  const stopListening = useCallback(async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Erro ao parar reconhecimento de fala:', error);
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSimulator,
  };
} 