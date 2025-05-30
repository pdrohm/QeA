import { questionsStorage } from '@/src/services/storage/questionsStorage';

import { Question } from '@/src/types';

import { useEffect, useState } from 'react';
export function useFavoritesScreen() {
    const [favorites, setFavorites] = useState<Question[]>([]);

    useEffect(() => {
      loadFavorites();
    }, []);
  
    const loadFavorites = async () => {
      try {
        const questions = await questionsStorage.getQuestions();
        const favoriteQuestions = questions.filter(q => q.isFavorite);
        setFavorites(favoriteQuestions);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    return {
        favorites,
        loadFavorites
    }
}