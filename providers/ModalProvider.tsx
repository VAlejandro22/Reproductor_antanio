'use client';

import AuthModal from '@/components/AuthModal';
import SubscribeModal from '@/components/SubscribeModal';
import UploadModal from '@/components/UploadModal';
import GenreModal from '@/components/GenreModal';
import YearModal from '@/components/YearModal';
import { ProductWithPrice, Genre } from '@/types';
import getGenres from '@/actions/getGenres';
import { useEffect, useState } from 'react';

interface ModalProviderProps {
  products: ProductWithPrice[];
  genres: Genre[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products, genres }) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>

      <AuthModal />
      <UploadModal genres={genres} />
      <GenreModal/>
      <YearModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
