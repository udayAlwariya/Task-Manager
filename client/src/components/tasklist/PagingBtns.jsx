function PagingBtns({ filters, handlePageChange }) {
  return (
    <div className="flex gap-2">
      {filters.page > 1 && (
        <button
          onClick={() => handlePageChange(filters.page - 1)}
          className="px-4 py-2 cursor-pointer text-sm font-medium border rounded-lg 
                     bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-sm"
        >
          ← Prev
        </button>
      )}

      <span className="px-4 py-2 text-sm cursor-pointer font-semibold text-gray-600 bg-white border rounded-lg shadow-sm">
        Page {filters.page}
      </span>

      <button
        onClick={() => handlePageChange(filters.page + 1)}
        className="px-4 py-2 cursor-pointer text-sm font-medium border rounded-lg 
                   bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-sm"
      >
        Next →
      </button>
    </div>
  );
}
export default PagingBtns;
