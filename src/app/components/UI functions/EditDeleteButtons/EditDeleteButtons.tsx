
interface EditDeleteButtonsProps {
    id: string;
    onEdit: (id: string)=> void;
    handleDelete: (id: string) => void;
}

export const EditDeleteButtons = ({id, onEdit, handleDelete}: EditDeleteButtonsProps) => {

    return (
        <>
            <button
                onClick={() => onEdit(id)}
                className="text-blue-400 hover:text-blue-600 p-5 border rounded-md"
            >
                Edit
            </button>
            <button
                onClick={() => handleDelete(id)}
                className="text-red-500 hover:text-red-700 p-5 border rounded-md"
                    > Delete 
            </button>
        </>
    )
};
