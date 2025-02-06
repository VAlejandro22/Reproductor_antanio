'use client';

import useLoadImageGenre from '@/hooks/useLoadImageGenre';
import React from 'react';
import Header from './Header';
import Image from 'next/image';
import PageContent from './PageContent';
import { Genre, Song } from '@/types'; // Asegúrate de importar los tipos correctos.

interface SongsByGenreProps {
  songs: Song[]; // Ajusta según tus datos.
  genre: Genre | null; // Usar el tipo correcto en lugar de `any`.
}

const SongsByGenre: React.FC<SongsByGenreProps> = ({ songs, genre }) => {
  // Cargar la imagen del género.
 
    const pathimg = useLoadImageGenre(genre);

  

  return (
    <div className="">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col items-center md:flex-row gap-x-5">
            <div className="relative w-32 h-32 lg:h-44 lg:w-44">
              <Image
                fill
                src={pathimg || '/images/disco.jpg'}
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">{genre? genre.start_year +' - '+ genre.end_year : 'Tus Géneros'}</p>
              <h1 className="text-4xl text-white sm:text-5xl lg:text-7xl font-bold">
              
                {genre? genre.name : 'Tus Géneros'}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-10 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-semibold text-2xl">Viaje en el tiempo!</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
};

export default SongsByGenre;
