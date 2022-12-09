import { PencilIcon } from "@heroicons/react/24/solid";

function EditButton({ onClick }) {
  return (
    <button
      className="btn btn-sm rounded-full btn-outline gap-1 self-end"
      onClick={onClick}
    >
      <PencilIcon className="w-3 h-3" />
      Edit
    </button>
  );
}

export default EditButton;
