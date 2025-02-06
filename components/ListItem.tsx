'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="group flex items-center w-full rounded-lg overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition p-4"
    >
      {/* Imagen */}
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image src={image} className="object-cover rounded-md" alt={name} fill />
      </div>

      {/* Texto */}
      <p className="flex-1 font-medium md:text-2xl truncate">{name}</p>

      {/* Botón Play */}
      <div className="transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center bg-green-500 p-3 rounded-full">
        <FaPlay className="text-black text-lg" />
      </div>
    </button>
  );
};


export default ListItem;
