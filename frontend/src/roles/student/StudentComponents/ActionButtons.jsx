

function ActionButtons({ onEdit, onRemove }) {
  return (
    <div className="flex gap-3 mt-5">
      <button 
        onClick={onEdit}
        className="bg-[#7865F1] hover:bg-[#6655d6] text-white py-2 px-4 rounded font-medium transition-colors"
      >
        Edit Submission
      </button>
      <button 
        onClick={onRemove}
        className="bg-[#F16567] hover:bg-[#e05557] text-white py-2 px-4 rounded font-medium transition-colors"
      >
        Remove Submission
      </button>
    </div>
  );
}

export default ActionButtons;