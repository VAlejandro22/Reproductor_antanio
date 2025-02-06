'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useYearModal from '@/hooks/useYearModal';
import { useUser } from '@/hooks/useUser';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const YearModal = () => {
  const yearModal = useYearModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      birth_year: '',
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      yearModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
  try {
    setIsLoading(true);

    const birthYear = parseInt(values.birth_year, 10);
    if (isNaN(birthYear) || birthYear < 1900 || birthYear > new Date().getFullYear()) {
      toast.error('Por favor, introduce un año de nacimiento válido.');
      setIsLoading(false);
      return;
    }

    const { error: supabaseError } = await supabaseClient
      .from('users')
      .update({ birth_year: birthYear })
      .eq('id', user?.id);

    if (supabaseError) {
      setIsLoading(false);
      return toast.error(supabaseError.message);
    }

    
    
    toast.success('Año de nacimiento guardado con éxito.');
    reset();
    yearModal.onClose();
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Algo salió mal. Por favor, intenta nuevamente.');
  } finally {
    setIsLoading(false);
  }
};

  

  return (
    <Modal
      title="Completar información"
      description="Por favor, introduce tu año de nacimiento."
      isOpen={yearModal.isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="birth_year"
          type="number"
          disabled={isLoading}
          {...register('birth_year', { required: true })}
          placeholder="Año de nacimiento"
        />
        <Button disabled={isLoading} type="submit">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default YearModal;
