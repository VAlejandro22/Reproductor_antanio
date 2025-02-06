import Image from 'next/image';

import getGenresbyUserID from '@/actions/getGenresbyUserID';
import getGenres from '@/actions/getGenres';
import Header from '@/components/Header';
import AllGenres from './components/AllGenres';

export const revalidate = 0;

const Allgeneres = async () => {
  const genres = await getGenres();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col items-center md:flex-row gap-x-5">
            <div className=" relative w-32 h-32 lg:h-44 lg:w-44">
              <Image
                fill
                src="/images/disco.jpg"
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-bold text-sm ">Disfruta</p>
              <h1 className="text-4xl text-white sm:text-5xl lg:text-7xl font-bold">
                Todos los generos
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-5 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-semibold text-2xl">Viaje en el tiempo!</h1>
        </div>
        <AllGenres genres={genres} />
      </div>
      
    </div>
  );
};

export default Allgeneres;
