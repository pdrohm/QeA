import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageService {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

class AsyncStorageService implements StorageService {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        const parsedValue = JSON.parse(value);
        return parsedValue;
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar item ${key}:`, error);
      throw new Error(`Falha ao buscar item ${key}`);
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const stringifiedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.error(`Erro ao salvar item ${key}:`, error);
      throw new Error(`Falha ao salvar item ${key}`);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover item ${key}:`, error);
      throw new Error(`Falha ao remover item ${key}`);
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar armazenamento:', error);
      throw new Error('Falha ao limpar armazenamento');
    }
  }
}

class StorageFactory {
  private static instance: StorageService;

  static getInstance(): StorageService {
    if (!StorageFactory.instance) {
      StorageFactory.instance = new AsyncStorageService();
    }
    return StorageFactory.instance;
  }
}

export const storage = StorageFactory.getInstance();