import { Genre } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getGenres = async (): Promise<Genre[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    const { data, error } = await supabase
      .from('genres')
      .select('*'); 

    if (error) {
      throw new Error(`Error fetching genres: ${error.message}`);
    }

    return data as Genre[]; // Devuelve el género encontrado
  } catch (err) {
    console.error(`Error en getGenrebyID: ${err}`);
    return []; 
  }
};

export default getGenres;
