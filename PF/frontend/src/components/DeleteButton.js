import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteButton({ onClick }) {
  return (
    <button
      className="btn btn-sm btn-error rounded-full btn-outline gap-1 self-end"
      onClick={onClick}
    >
      <TrashIcon className="w-3 h-3" />
      Delete
    </button>
  );
}

export default DeleteButton;
