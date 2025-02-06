import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Genre } from '@/types';

const useLoadImageGenre = (genre: Genre|null) => {
  const supabaseClient = useSupabaseClient();

  if (!genre) {
    return null;
  }
  const { data: imageData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(genre.image_path);

  return imageData.publicUrl;
};

export default useLoadImageGenre;
