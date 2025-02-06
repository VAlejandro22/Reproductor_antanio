import { Genre } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getGenrebyID = async (id?: number): Promise<Genre | null> => {
  if (!id) {
    console.error('No se proporcionó un ID válido.');
    return null; // Devuelve null si no hay ID
  }

  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    const { data, error } = await supabase
      .from('genres')
      .select('*')
      .eq('id', id)
      .single(); // Obtiene el primer registro directamente

    if (error) {
      throw new Error(`Error fetching genre by ID: ${error.message}`);
    }

    return data as Genre; // Devuelve el género encontrado
  } catch (err) {
    console.error(`Error en getGenrebyID: ${err}`);
    return null; // Devuelve null en caso de error
  }
};

export default getGenrebyID;
