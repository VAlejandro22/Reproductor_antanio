

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';

import getGenresbyUserID from '@/actions/getGenresbyUserID';

import AllGenres from '@/app/allgenres/components/AllGenres';
export const revalidate = 0;

export default async function Home() {
  const genres = await getGenresbyUserID();
  const currentTime = new Date();
  const hour = currentTime.getHours();

  let partOfDay;

  
  const onClick = () => {
    // if (!user) {
    //   return authModal.onOpen();
    // }
    // // if (genres.length >= 1 && !subscription) {
    // //   return subscribeModal.onOpen();
    // // }

    // return uploadModal.onOpen();
  };


  if (hour >= 5 && hour < 12) {
    partOfDay = 'Buenos dias';
  } else if (hour >= 12 && hour < 17) {
    partOfDay = 'Buenas tardes';
  } else {
    partOfDay = 'Buenas noches';
  }

  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
      <Header>
        <div className="mt-20 text-gray-30 ">
          <div className="flex flex-col items-center gap-y-6">
            {/* Contenedor para el momento del día */}
            <div className="w-full text-center">
              <h1 className="text-5xl text-[#f3f3f3] sm:text-6xl lg:text-8xl font-bold">
                {partOfDay ? partOfDay : 'Welcome Back'}
              </h1>
            </div>

            {/* Contenedor para ListItem */}
            <div className="w-full max-w-md">
              <ListItem
                image="/images/liked.png"
                name="Canciones favoritas"
                href="liked"
              />
            </div>
          </div>
        </div>
      </Header>


      <div className="mt-10 mb-7 px-6">
        <div className="">
          <h1 className="text-white font-bold text-2xl">Tus generos </h1>
        </div>
        <AllGenres genres={genres} />
      </div>
    </div>
  );
}
