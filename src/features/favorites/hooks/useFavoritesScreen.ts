import { useQuestionsStore } from '@/src/stores/questionsStore';


import { useEffect } from 'react';
export function useFavoritesScreen() {

    const { favorites, getFavoriteQuestions } = useQuestionsStore();


    useEffect(() => {
      getFavoriteQuestions();
    }, [getFavoriteQuestions]);
  
 

    return {
        favorites,
        getFavoriteQuestions
    }
}