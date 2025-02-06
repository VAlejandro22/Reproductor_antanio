'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useLoadImageGenre from '@/hooks/useLoadImageGenre';
import usePlayer from '@/hooks/usePlayer';
import { Genre } from '@/types';

interface MediaItemProps {
  data: Genre;
  href: string;
//   onClick?: (id: number) => void;
}

const MediaItemGenre: React.FC<MediaItemProps> = ({ data,href}) => {
  const player = usePlayer();
  const imageUrl = useLoadImageGenre(data);
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imageUrl || '/images/liked.png'}
          fill
          alt="Image"
          className=" object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.name}</p>
        <p className=" text-neutral-400 text-sm truncate">{data.start_year}</p>
      </div>
    </div>
  );
};

export default MediaItemGenre;
