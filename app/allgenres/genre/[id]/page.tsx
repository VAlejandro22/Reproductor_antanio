import getGenrebyID from '@/actions/getGenrebyID';
import getSongsbyGenre from '@/actions/getSongsbyGenre';
import SongsByGenre from '@/components/SongsByGenre';

interface GenrePageProps {
  params: { id: number };
}

const Genre = async ({ params }: GenrePageProps) => {
  const { id } = params; // Capturamos el parámetro dinámico desde el servidor.
  const songs = await getSongsbyGenre(id);
  const genre= await getGenrebyID(id);

  return (
    <div className="">
      <SongsByGenre songs={songs} genre={genre}  />
    </div>
  );
};

export default Genre;
