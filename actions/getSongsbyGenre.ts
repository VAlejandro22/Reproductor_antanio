import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getSongs from './getSongs';

const getSongsbyGenre = async (id?: number): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Si no hay un ID, devolver todas las canciones
  if (!id) {
    return await getSongs();
  }

  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('genre_id', id) // Cambiar ilike por eq para comparación directa
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching songs by genre: ${error.message}`);
    }

    return (data || []) as Song[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getSongsbyGenre;
