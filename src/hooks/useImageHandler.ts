import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export interface ImageInfo {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
}

export function useImageHandler() {
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async (): Promise<ImageInfo | null> => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Por favor, conceda permissão para acessar sua biblioteca de fotos.'
        );
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: true,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type || 'image',
        size: asset.fileSize || 0,
      };
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Falha ao selecionar imagem. Por favor, tente novamente.');
      return null;
    }
  };

  const saveImage = async (imageInfo: ImageInfo): Promise<string | null> => {
    try {
      setIsLoading(true);

      const timestamp = Date.now();
      const fileName = `image_${timestamp}.jpg`;
      const filePath = `${FileSystem.documentDirectory}images/${fileName}`;

      const imagesDir = `${FileSystem.documentDirectory}images`;
      const dirInfo = await FileSystem.getInfoAsync(imagesDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
      }

      await FileSystem.copyAsync({
        from: imageInfo.uri,
        to: filePath,
      });

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        throw new Error('Falha ao salvar imagem');
      }

      return filePath;
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      Alert.alert('Erro', 'Falha ao salvar imagem. Por favor, tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getImageBase64 = async (filePath: string): Promise<string | null> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error('Erro ao ler imagem como base64:', error);
      return null;
    }
  };

  const deleteImage = async (filePath: string): Promise<boolean> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      return false;
    }
  };

  return {
    isLoading,
    pickImage,
    saveImage,
    getImageBase64,
    deleteImage,
  };
} 