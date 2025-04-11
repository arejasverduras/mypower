interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSave: () => void;
    children: React.ReactNode;
  }


export const Modal = ({ isOpen, onSave, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-primary-color text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            ✕
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-transparent text-white font-semibold border border-white rounded-lg shadow-md hover:bg-white hover:text-primary-color"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="py-2 px-4 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
