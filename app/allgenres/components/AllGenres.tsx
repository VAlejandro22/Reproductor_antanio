'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Genre } from '@/types';
import { useUser } from '@/hooks/useUser';
import useYearModal from '@/hooks/useYearModal';
import GenreItem from '@/components/GenreItem';

interface LikedContentProps {
  genres: Genre[];
}

const AllGenres: React.FC<LikedContentProps> = ({ genres }) => {
  const router = useRouter();
  const { isLoading, user, userDetails } = useUser();
  const yearModal = useYearModal(); // Hook del modal

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    
    
    if (userDetails && userDetails.birth_year === null ) {
      yearModal.onOpen();
      
    }
    
  }, [userDetails]);
  

  // Mostrar mensaje si no hay géneros
  if (genres.length === 0) {
    return (
      <div className="mt-4 flex flex-col px-6 gap-y-2 w-full text-neutral-400">
        Lo lamentamos! No existen géneros disponibles para usted.
      </div>
    );
  }

  return (
    <div
      className="grid 
      grid-cols-2 
      sm:grid-cols-3 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5 
      2xl:grid-cols-6 
      gap-4 
      mt-4"
    >
      {genres.map((item) => (
        <GenreItem
          data={item}
          key={item.id}
          href={`/allgenres/genre/${item.id}`}
        />
      ))}
    </div>
  );
};

export default AllGenres;
