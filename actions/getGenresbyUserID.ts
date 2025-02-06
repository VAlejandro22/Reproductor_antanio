import { Genre } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getGenresbyUserID = async (): Promise<Genre[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Obtener la sesión del usuario
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  // Obtener los géneros del usuario
  const { data: userGenres, error: userGenresError } = await supabase
    .from('user_genres')
    .select('*')
    .eq('user_id', sessionData.session?.user.id);

  if (userGenresError) {
    console.log(userGenresError.message);
    return [];
  }

  // Obtener los detalles de los géneros asociados
  const generos = await Promise.all(
    userGenres?.map(async (genre) => {
      const { data: genreData, error: genreError } = await supabase
        .from('genres')
        .select('*')
        .eq('id', genre.genre_id)
        .single(); // Usamos .single() para obtener un solo objeto en lugar de un array

      if (genreError) {
        console.log(genreError.message);
        return null;
      }

      return genreData;
    }) || []
  );

  // Filtrar los géneros nulos
  return generos.filter(Boolean) as Genre[];
};

export default getGenresbyUserID;
