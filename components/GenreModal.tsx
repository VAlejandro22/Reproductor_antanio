'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useGenreModal from '@/hooks/useGenreModal';
import { useUser } from '@/hooks/useUser';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const GenreModal = () => {
  const genreModal = useGenreModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      start_year: '',
      end_year: '',
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      genreModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      // Validar archivo de imagen
      const imageFile = values.image?.[0];
      if (!imageFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqId = uniqid();

      // Subir imagen al storage
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.name}-${uniqId}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Fallo al subir la imagen');
      }

      // Insertar género en la tabla
      const { error: supabaseError } = await supabaseClient
        .from('genres')
        .insert({
          
          name: values.name,
          start_year: parseInt(values.start_year),
          end_year: parseInt(values.end_year),
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      // Refrescar página y mostrar éxito
      router.refresh();
      setIsLoading(false);
      toast.success('Genero Creado!');
      reset();
      genreModal.onClose();
    } catch (error) {
      toast.error('Something went wrong! Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Genre"
      description="Upload genre details"
      isOpen={genreModal.isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          disabled={isLoading}
          {...register('name', { required: true })}
          placeholder="Genre name"
        />
        <Input
          id="start_year"
          type="number"
          disabled={isLoading}
          {...register('start_year', { required: true })}
          placeholder="Start year"
        />
        <Input
          id="end_year"
          type="number"
          disabled={isLoading}
          {...register('end_year', { required: true })}
          placeholder="End year"
        />
        <div className="pb-1">
          <div>Select an image</div>
          <Input
            type="file"
            id="image"
            disabled={isLoading}
            {...register('image', { required: true })}
            accept="image/*"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default GenreModal;
