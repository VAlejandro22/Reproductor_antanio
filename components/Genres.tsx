'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus,AiOutlineDatabase } from 'react-icons/ai';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useGenreModal from '@/hooks/useGenreModal';
import { Genre } from '@/types';
import MediaItemGenre from './MediaItemGenre';
import useOnPlay from '@/hooks/useOnPlay';

import useSubscribeModal from '@/hooks/useSubscribeModal';

interface LibraryProps {
  genres: Genre[];
}

const Genres: React.FC<LibraryProps> = ({ genres }) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useGenreModal();
  //const onPlay = useOnPlay(genres);
  const { user, subscription,userDetails } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // if (genres.length >= 1 && !subscription) {
    //   return subscribeModal.onOpen();
    // }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <AiOutlineDatabase size={26} className="text-neutral-400" />
          <p className="text-neutral-400 text-md font-medium">Añadir Genero</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {genres.map((item) => (
          <MediaItemGenre
            data={item}
            key={item.id}
            href={`/allgenres/genre/${item.id}`}
            // onClick={(id: string) => onPlay(id)}
          />
            // <div>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
