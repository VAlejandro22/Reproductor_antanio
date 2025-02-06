'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useLoadImageGenre from '@/hooks/useLoadImageGenre';
import { Genre } from '@/types';
import PlayButton from './PlayButton';

interface SongItemProps {
  data: Genre;
  href: string;
//   onClick: (id: number) => void;
}

// const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
const GenreItem: React.FC<SongItemProps> = ({ data,href }) => {
    const router = useRouter();
    const onClick = () => {
        router.push(href);
      };
  const imagePath = useLoadImageGenre(data);
  return (
    <div
    //   onClick={() => onClick(data.id)}
    onClick={onClick}
      className=" relative 
      group 
      flex 
      flex-col 
      items-center 
      justify-center 
      rounded-md 
      overflow-hidden 
      gap-x-4 
      bg-neutral-400/5 
      cursor-pointer 
      hover:bg-neutral-400/10 
      transition 
      p-3"
    >
      <div
        className=" relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden"
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          fill
          alt="cover image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.name}</p>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          {data.start_year} - {data.end_year}
        </p>
      </div>
     
    </div>
  );
};

export default GenreItem;
