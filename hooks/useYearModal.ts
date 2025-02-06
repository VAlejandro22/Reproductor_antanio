import { create } from 'zustand';

interface UploadModalStore2 {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useYearModal = create<UploadModalStore2>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useYearModal;
